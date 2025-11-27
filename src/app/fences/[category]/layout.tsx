import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

// Маппинг категорий оград к slug для SEO
const categoryToSeoSlug: Record<string, string> = {
  'granite': 'fences-granite',
  'polymer': 'fences-polymer',
  'metal': 'fences-metal',
};

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const categoryName = params.category;
  const seoSlug = categoryToSeoSlug[categoryName];
  
  // Категории имена для fallback
  const categoryNames: Record<string, string> = {
    'granite': 'Гранитные',
    'polymer': 'Полимерные',
    'metal': 'Металлические',
  };
  
  const displayName = categoryNames[categoryName] || 'Ограды';
  
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
    title: `${displayName} ограды | Каменная Роза`,
    description: `Каталог ${displayName.toLowerCase()} оград с доставкой и установкой в Витебске`,
    keywords: `${displayName.toLowerCase()} ограды, ограды, гранит`,
    robots: 'index, follow',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
