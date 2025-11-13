import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForPage(
    'services',
    'Услуги доставки и установки памятников | КР',
    'Доставка, установка, обслуживание памятников'
  );
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
