import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

export const revalidate = 3600; // Revalidate every hour

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

// Маппинг категорий аксессуаров к slug для SEO
const categoryToSeoSlug: Record<string, string> = {
  'vases': 'accessories-vases',
  'lamps': 'accessories-lamps',
  'sculptures': 'accessories-sculptures',
  'frames': 'accessories-frames',
  'bronze': 'accessories-bronze',
  'plates': 'accessories-plates',
  'tables': 'accessories-tables',
};

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const categoryName = params.category;
  const seoSlug = categoryToSeoSlug[categoryName];
  
  // Категории имена для fallback
  const categoryNames: Record<string, string> = {
    'vases': 'Вазы',
    'lamps': 'Лампы',
    'sculptures': 'Скульптуры',
    'frames': 'Рамки',
    'bronze': 'Бронза',
    'plates': 'Таблички',
    'tables': 'Столики',
  };
  
  const displayName = categoryNames[categoryName] || 'Аксессуары';
  
  if (seoSlug) {
    try {
      const seoData = await getPageSEOData(seoSlug);
      if (seoData) {
        return generateMetadataFromSEO(seoData);
      }
    } catch (error) {
      console.error(`Failed to load SEO for ${seoSlug}:`, error);
    }
  }
  
  // Полный fallback метаданные с обязательным title
  return {
    title: `${displayName} | Каменная Роза`,
    description: `Каталог ${displayName.toLowerCase()} для памятников с доставкой в Витебске`,
    keywords: `${displayName.toLowerCase()}, аксессуары, памятники`,
    robots: 'index, follow',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
