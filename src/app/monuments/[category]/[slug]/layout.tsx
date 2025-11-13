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
  const params = await props.params;
  const { category, slug } = params;

  // Загружаем SEO данные памятника
  return await getMetadataForMonument(category, slug);
}

export default function MonumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
