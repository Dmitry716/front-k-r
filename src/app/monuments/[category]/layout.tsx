import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

export const revalidate = 3600; // Revalidate every hour

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

// Маппинг категорий к slug для SEO
const categoryToSeoSlug: Record<string, string> = {
  'single': 'monuments-single',
  'double': 'monuments-double',
  'cheap': 'monuments-cheap',
  'cross': 'monuments-cross',
  'heart': 'monuments-heart',
  'composite': 'monuments-composite',
  'europe': 'monuments-europe',
  'artistic': 'monuments-artistic',
  'tree': 'monuments-tree',
  'complex': 'monuments-complex',
};

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const categoryName = params.category;
  const seoSlug = categoryToSeoSlug[categoryName];
  
  // Категории имена для fallback
  const categoryNames: Record<string, string> = {
    'single': 'Одиночные',
    'double': 'Двойные',
    'cheap': 'Недорогие',
    'cross': 'В виде креста',
    'heart': 'В виде сердца',
    'composite': 'Составные',
    'europe': 'Европейские',
    'artistic': 'Художественная резка',
    'tree': 'В виде деревьев',
    'complex': 'Мемориальные комплексы',
  };
  
  const displayName = categoryNames[categoryName] || 'Памятники';
  
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
    title: `${displayName} гранитные памятники | Каменная Роза`,
    description: `Каталог ${displayName.toLowerCase()} гранитных памятников с доставкой и установкой в Витебске`,
    keywords: `${displayName.toLowerCase()}, памятники, гранит`,
    robots: 'index, follow',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
