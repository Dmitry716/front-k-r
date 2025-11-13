import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'blogs',
    'Блог о памятниках и граните | КР',
    'Статьи и советы по выбору и уходу за памятниками'
  );
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
