import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

// Маппинг категорий благоустройства к slug для SEO
const categoryToSeoSlug: Record<string, string> = {
  'graves': 'landscape-graves',
  'foundation': 'landscape-foundation',
  'tiles': 'landscape-tiles',
  'tables': 'landscape-tables',
  'gravel': 'landscape-gravel',
  'lawn': 'landscape-lawn',
};

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const categoryName = params.category;
  const seoSlug = categoryToSeoSlug[categoryName];
  
  // Категории имена для fallback
  const categoryNames: Record<string, string> = {
    'graves': 'Могилы',
    'foundation': 'Фундаменты',
    'tiles': 'Плитки',
    'tables': 'Столики',
    'gravel': 'Щебень',
    'lawn': 'Газон',
  };
  
  const displayName = categoryNames[categoryName] || 'Благоустройство';
  
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
    title: `Благоустройство ${displayName.toLowerCase()} | Каменная Роза`,
    description: `Услуги благоустройства ${displayName.toLowerCase()} кладбищ в Витебске`,
    keywords: `благоустройство, ${displayName.toLowerCase()}, кладбище`,
    robots: 'index, follow',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
