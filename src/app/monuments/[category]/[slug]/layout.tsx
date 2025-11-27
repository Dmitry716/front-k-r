import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForMonument } from '@/lib/entity-seo-metadata';

interface MonumentLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  props: MonumentLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params;
    const { category, slug } = params;

    // Загружаем SEO данные памятника
    const metadata = await getMetadataForMonument(category, slug);
    
    // Гарантируем что title всегда есть
    if (!metadata.title) {
      metadata.title = 'Памятники из гранита | Каменная Роза';
    }
    
    return metadata;
  } catch (error) {
    console.error('Error generating monument metadata:', error);
    // Возвращаем fallback metadata
    return {
      title: 'Памятники из гранита | Каменная Роза',
      description: 'Памятники из гранита с доставкой и установкой',
    };
  }
}

export default function MonumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
