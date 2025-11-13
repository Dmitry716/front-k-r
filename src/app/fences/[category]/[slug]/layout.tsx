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
  const params = await props.params;
  const { category, slug } = params;

  // Загружаем SEO данные ограды
  return await getMetadataForFence(category, slug);
}

export default function FenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
