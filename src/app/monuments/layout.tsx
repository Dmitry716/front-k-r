import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'monuments',
    'Памятники из гранита | КР',
    'Каталог памятников из гранита с доставкой и установкой'
  );
}

export default function MonumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
