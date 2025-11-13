import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'landscape',
    'Ландшафтный дизайн | КР',
    'Проектирование и реализация ландшафтного дизайна кладбищ'
  );
}

export default function LandscapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
