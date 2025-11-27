import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForFence } from '@/lib/entity-seo-metadata';

interface FenceLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  props: FenceLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params;
    const { category, slug } = params;

    // Загружаем SEO данные ограды
    const metadata = await getMetadataForFence(category, slug);
    
    // Гарантируем что title всегда есть
    if (!metadata.title) {
      metadata.title = 'Гранитные ограды | Каменная Роза';
    }
    
    return metadata;
  } catch (error) {
    console.error('Error generating fence metadata:', error);
    // Возвращаем fallback metadata
    return {
      title: 'Гранитные ограды | Каменная Роза',
      description: 'Гранитные ограды с доставкой и установкой',
    };
  }
}

export default function FenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
