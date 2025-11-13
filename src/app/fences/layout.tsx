import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'fences',
    'Гранитные ограды | КР',
    'Кованные и гранитные ограды для памятников'
  );
}

export default function FencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
