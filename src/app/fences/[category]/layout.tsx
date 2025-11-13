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
    title: 'Ограды',
    description: 'Каталог оград',
  };
}

export default function CategoryLayout({ children }: LayoutProps) {
  return children;
}
