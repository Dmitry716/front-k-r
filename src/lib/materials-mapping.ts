/**
 * Единый словарь материалов - один источник истины для всего приложения
 * Содержит только активные материалы (12 шт)
 */
export const materialMapping: Record<string, { en: string; color: string }> = {
  Дымовский: { en: "DYMOVSKY", color: "#5C4033" },
  Амфиболит: { en: "AMFIBOLITGRANATOVY", color: "#4A3728" },
  Мансуровский: { en: "MANSUR", color: "#556B2F" },
  Покостовский: { en: "Pokost", color: "#696969" },
  "Балтик Грин": { en: "BalticGreen", color: "#228B22" },
  "Балморал Рэд": { en: "BALMORALRED", color: "#8B0000" },
  Аврора: { en: "Aurora", color: "#FFB6C1" },
  "Куру Грей": { en: "CuruGray", color: "#808080" },
  Лезниковский: { en: "LEZNIKI", color: "#505050" },
  "Блю Перл": { en: "BluePearl", color: "#1E90FF" },
  Амадеус: { en: "AMADEUS", color: "#CD7F32" },
  Мрамор: { en: "MUGLAWHITE", color: "#F5F5DC" },
};

/**
 * Получить данные материала (английское имя и цвет) по русскому названию
 */
export function getMaterialData(russianName: string): { en: string; color: string } {
  return materialMapping[russianName] || { en: "placeholder", color: "#A9A9A9" };
}

/**
 * Получить английское название материала по русскому имени (для обратной совместимости)
 */
export function getMaterialEnglishName(russianName: string): string {
  return materialMapping[russianName]?.en || "placeholder";
}

/**
 * Получить hex-код цвета для материала (для обратной совместимости)
 */
export function getColorCode(materialEnglishName: string): string {
  // Поиск по английскому имени
  for (const data of Object.values(materialMapping)) {
    if (data.en === materialEnglishName) {
      return data.color;
    }
  }
  return "#A9A9A9";
}
