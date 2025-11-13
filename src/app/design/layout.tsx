import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'design',
    'Дизайн и резка памятников | КР',
    'Художественная резка, 3D моделирование памятников'
  );
}

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
