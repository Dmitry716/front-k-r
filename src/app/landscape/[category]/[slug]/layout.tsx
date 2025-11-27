import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForLandscape } from '@/lib/entity-seo-metadata';

interface LandscapeLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  props: LandscapeLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params;
    const { category, slug } = params;

    // Загружаем SEO данные ландшафтного элемента
    const metadata = await getMetadataForLandscape(category, slug);
    
    // Гарантируем что title всегда есть
    if (!metadata.title) {
      metadata.title = 'Благоустройство | Каменная Роза';
    }
    
    return metadata;
  } catch (error) {
    console.error('Error generating landscape metadata:', error);
    // Возвращаем fallback metadata
    return {
      title: 'Благоустройство | Каменная Роза',
      description: 'Благоустройство могил и памятников',
    };
  }
}

export default function LandscapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
