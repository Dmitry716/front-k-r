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
  const params = await props.params;
  const { category, slug } = params;

  // Загружаем SEO данные ландшафтного элемента
  return await getMetadataForLandscape(category, slug);
}

export default function LandscapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
