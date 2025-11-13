import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

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
    title: 'Памятники',
    description: 'Каталог памятников',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
