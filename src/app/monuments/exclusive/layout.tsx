import { Metadata } from 'next';
import { getPageSEOData, generateMetadataFromSEO } from "@/lib/seo-metadata";

interface LayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getPageSEOData('monuments-exclusive');
    return generateMetadataFromSEO(seoData);
  } catch (error) {
    console.error('Failed to load SEO for monuments-exclusive:', error);
  }
  
  // Fallback метаданные
  return {
    title: 'Эксклюзивные памятники',
    description: 'Каталог эксклюзивных памятников',
  };
}

export default function ExclusiveLayout({ children }: LayoutProps) {
  return children;
}
