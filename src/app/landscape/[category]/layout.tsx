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
  const seoSlug = categoryToSeoSlug[params.category];
  
  if (seoSlug) {
    try {
      const seoData = await getPageSEOData(seoSlug);
      return generateMetadataFromSEO(seoData);
    } catch (error) {
      console.error(`Failed to load SEO for ${seoSlug}:`, error);
    }
  }
  
  // Fallback метаданные
  return {
    title: 'Благоустройство',
    description: 'Услуги благоустройства кладбищ',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
