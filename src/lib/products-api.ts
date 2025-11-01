import { db } from "@/lib/db";
import { products as productsTable } from "@/lib/schema";
import { Product, ColorOption } from "@/app/types/types";
import { eq } from "drizzle-orm";

const EXCLUSIVE_PRODUCT_DESCRIPTION = "Представленный эксклюзивный памятник станет идеальным решением оформления захоронения ваших родных и близких. В качестве художественного оформления рекомендуем использовать накладные бронзовые буквы и цифры итальянского производителя Caggiati, либо покрыть надпись сусальным золотом, а фото усопшего оформить в медальон в бронзовой рамке.";

interface DBProduct {
  id: number;
  slug: string;
  name: string;
  height: string | null;
  price: string | number | null;
  oldPrice: string | number | null;
  discount: string | number | null;
  category: string;
  image: string;
  colors: string;
  options: string;
  hit: boolean | null;
  popular: boolean | null;
}

const convertPrice = (price: string | number | null): number | undefined => {
  if (price === null || price === undefined) return undefined;
  const num = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(num) ? undefined : num;
};

/**
 * Получить все продукты из базы данных
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = (await db.select().from(productsTable)) as DBProduct[];

    return dbProducts.map((dbProduct: DBProduct) => ({
      id: dbProduct.id,
      slug: dbProduct.slug,
      name: dbProduct.name,
      description: dbProduct.category === "Эксклюзивные" ? EXCLUSIVE_PRODUCT_DESCRIPTION : undefined,
      height: dbProduct.height || undefined,
      price: convertPrice(dbProduct.price),
      oldPrice: convertPrice(dbProduct.oldPrice),
      discount: convertPrice(dbProduct.discount),
      category: dbProduct.category,
      image: dbProduct.image,
      colors: JSON.parse(dbProduct.colors) as ColorOption[],
      options: JSON.parse(dbProduct.options) as Record<string, string>,
      hit: dbProduct.hit || false,
      popular: dbProduct.popular || false,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Получить продукты по категории
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const dbProducts = (await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category, category))) as DBProduct[];

    return dbProducts.map((dbProduct: DBProduct) => ({
      id: dbProduct.id,
      slug: dbProduct.slug,
      name: dbProduct.name,
      description: category === "Эксклюзивные" ? EXCLUSIVE_PRODUCT_DESCRIPTION : undefined,
      height: dbProduct.height || undefined,
      price: convertPrice(dbProduct.price),
      oldPrice: convertPrice(dbProduct.oldPrice),
      discount: convertPrice(dbProduct.discount),
      category: dbProduct.category,
      image: dbProduct.image,
      colors: JSON.parse(dbProduct.colors) as ColorOption[],
      options: JSON.parse(dbProduct.options) as Record<string, string>,
      hit: dbProduct.hit || false,
      popular: dbProduct.popular || false,
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

/**
 * Получить продукт по ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const dbProducts = (await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1)) as DBProduct[];

    if (!dbProducts.length) return null;
    const dbProduct = dbProducts[0];

    return {
      id: dbProduct.id,
      slug: dbProduct.slug,
      name: dbProduct.name,
      description: dbProduct.category === "Эксклюзивные" ? EXCLUSIVE_PRODUCT_DESCRIPTION : undefined,
      height: dbProduct.height || undefined,
      price: convertPrice(dbProduct.price),
      oldPrice: convertPrice(dbProduct.oldPrice),
      discount: convertPrice(dbProduct.discount),
      category: dbProduct.category,
      image: dbProduct.image,
      colors: JSON.parse(dbProduct.colors) as ColorOption[],
      options: JSON.parse(dbProduct.options) as Record<string, string>,
      hit: dbProduct.hit || false,
      popular: dbProduct.popular || false,
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

/**
 * Получить Эксклюзивные продукты
 */
export async function getExclusiveProducts(): Promise<Product[]> {
  return getProductsByCategory("Эксклюзивные");
}

/**
 * Получить продукт по slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProducts = (await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .limit(1)) as DBProduct[];

    if (!dbProducts.length) return null;
    const dbProduct = dbProducts[0];

    return {
      id: dbProduct.id,
      slug: dbProduct.slug,
      name: dbProduct.name,
      description: dbProduct.category === "Эксклюзивные" ? EXCLUSIVE_PRODUCT_DESCRIPTION : undefined,
      height: dbProduct.height || undefined,
      price: convertPrice(dbProduct.price),
      oldPrice: convertPrice(dbProduct.oldPrice),
      discount: convertPrice(dbProduct.discount),
      category: dbProduct.category,
      image: dbProduct.image,
      colors: JSON.parse(dbProduct.colors) as ColorOption[],
      options: JSON.parse(dbProduct.options) as Record<string, string>,
      hit: dbProduct.hit || false,
      popular: dbProduct.popular || false,
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
