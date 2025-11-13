import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForBlog } from '@/lib/entity-seo-metadata';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: BlogLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  // Загружаем SEO данные блога
  return await getMetadataForBlog(slug);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
