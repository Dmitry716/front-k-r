import { Product, ColorOption } from "@/app/types/types";
import { getMaterialEnglishName, getColorCode } from "./materials-mapping";

/**
 * Интерфейс для отдельной строки из Excel
 */
export interface ExcelRow {
  article: string; // Столбец A
  description: string; // Столбец C
  material: string; // Столбец D
  availability: string; // Столбец F
  size: string; // Столбец G (Д/Ш/В)
  customSize: string; // Столбец H
  customColor: string; // Столбец I
  decoration: string; // Столбец J
  storage: string; // Столбец K
  installation: string; // Столбец L
  hit: string; // Столбец M - Хит продаж
  new: string; // Столбец N - Новинка
  recommend: string; // Столбец O - Рекомендуем
  price: number; // Столбец Q
  discount: number; // Столбец R
}

/**
 * Генерировать slug из названия
 * Пример: "Эксклюзивный памятник К-3" -> "exclusive-monument-k3"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[а-я]/g, (char) => {
      const map: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Извлечь базовую модель из артикула
 * Пример: "К-3-0-12" -> "К-3"
 */
export function extractBaseModel(article: string): string {
  const parts = article.split("-");
  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`;
  }
  return article;
}

/**
 * Преобразовать базовую модель в формат для папок
 * Пример: "К-3" -> "K3"
 */
export function formatModelForFolder(model: string): string {
  return model.replace("К-", "K").replace("-", "");
}

/**
 * Построить путь к изображению
 * Пример: K3, DYMOVSKY -> "/Эксклюзивные/K3_DYMOVSKY/800x800/frame_0001.jpg"
 */
export function buildImagePath(modelFolder: string, materialEnglish: string): string {
  const folderName = `${modelFolder}_${materialEnglish}`;
  return `/Эксклюзивные/${folderName}/800x800/frame_0001.jpg`;
}

/**
 * Распарсить размеры из формата "Д/Ш/В"
 * Пример: "130/70/120" -> { length: 130, width: 70, height: 120 }
 */
export function parseSizes(sizeStr: string): {
  length: number;
  width: number;
  height: number;
} | null {
  if (!sizeStr) return null;
  
  const parts = sizeStr.split("/").map((p) => parseInt(p.trim(), 10));
  
  if (parts.length === 3 && parts.every((p) => !isNaN(p))) {
    return {
      length: parts[0],
      width: parts[1],
      height: parts[2],
    };
  }
  
  return null;
}

/**
 * Преобразовать строку Excel в объект ColorOption
 */
export function excelRowToColorOption(row: ExcelRow): ColorOption {
  const materialEnglish = getMaterialEnglishName(row.material);
  const baseModel = extractBaseModel(row.article);
  const modelFolder = formatModelForFolder(baseModel);
  
  // Вычисляем цену, учитывая скидку
  let price = row.price || 0;
  if (row.discount && row.discount > 0) {
    price = price - row.discount;
  }
  
  return {
    name: row.material,
    color: getColorCode(materialEnglish),
    image: buildImagePath(modelFolder, materialEnglish),
    price: price || undefined,
  };
}

/**
 * Преобразовать строку Excel в объект Product
 * Группирует все материалы по базовой модели
 */
export function createProductFromRows(
  rows: ExcelRow[],
  productId: number
): Product {
  if (rows.length === 0) {
    throw new Error("Cannot create product from empty rows array");
  }

  const firstRow = rows[0];
  const baseModel = extractBaseModel(firstRow.article);
  const materialEnglish = getMaterialEnglishName(firstRow.material);
  const modelFolder = formatModelForFolder(baseModel);

  // Парсим размеры
  const sizes = parseSizes(firstRow.size);
  
  // Строим options - только динамические поля из БД
  const options: Record<string, string> = {};
  
  if (firstRow.availability) {
    options["Наличие"] = firstRow.availability;
  }
  
  if (sizes) {
    options["Общая длина"] = `${sizes.length} см`;
    options["Общая ширина"] = `${sizes.width} см`;
    options["Общая высота"] = `${sizes.height} см`;
  }

  // Строим массив цветов из всех строк
  const colors: ColorOption[] = rows.map((row) => excelRowToColorOption(row));

  // Считаем цену
  let price = firstRow.price || 0;
  let oldPrice: number | undefined;
  let discount: number | undefined;

  if (firstRow.discount && firstRow.discount > 0) {
    oldPrice = price;
    price = price - firstRow.discount;
    discount = Math.round((firstRow.discount / oldPrice) * 100);
  }

  const productName = `Эксклюзивный памятник ${baseModel}`;
  const slug = generateSlug(productName);

  const product: Product = {
    id: productId,
    slug,
    name: productName,
    description: firstRow.description,
    height: sizes ? `${sizes.height} см` : undefined,
    price: price || undefined,
    ...(oldPrice && { oldPrice }),
    ...(discount && { discount }),
    category: "Эксклюзивные",
    image: buildImagePath(modelFolder, materialEnglish),
    colors,
    options,
  };

  return product;
}
