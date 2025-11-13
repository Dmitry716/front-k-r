import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'accessories',
    'Аксессуары для памятников | КР',
    'Кресты, свечи, аксессуары для памятников'
  );
}

export default function AccessoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
