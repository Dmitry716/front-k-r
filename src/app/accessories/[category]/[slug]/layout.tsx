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
  const params = await props.params;
  const { category, slug } = params;

  // Загружаем SEO данные аксессуара
  return await getMetadataForAccessory(category, slug);
}

export default function AccessoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
