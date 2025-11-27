import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForAccessory } from '@/lib/entity-seo-metadata';

interface AccessoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  props: AccessoryLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params;
    const { category, slug } = params;

    // Загружаем SEO данные аксессуара
    const metadata = await getMetadataForAccessory(category, slug);
    
    // Гарантируем что title всегда есть
    if (!metadata.title) {
      metadata.title = 'Аксессуары | Каменная Роза';
    }
    
    return metadata;
  } catch (error) {
    console.error('Error generating accessory metadata:', error);
    // Возвращаем fallback metadata
    return {
      title: 'Аксессуары | Каменная Роза',
      description: 'Аксессуары для памятников из гранита',
    };
  }
}

export default function AccessoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
