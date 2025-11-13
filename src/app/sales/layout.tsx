import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'campaigns',
    'Акции и предложения | КР',
    'Специальные предложения и акции на памятники'
  );
}

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
