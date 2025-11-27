import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForExclusiveMonument } from '@/lib/entity-seo-metadata';

interface ExclusiveMonumentLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(
  props: ExclusiveMonumentLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params;
    const slug = params.slug;
    
    // Загружаем SEO данные эксклюзивного памятника
    return await getMetadataForExclusiveMonument(slug);
  } catch (error) {
    console.error('Error generating metadata for exclusive monument:', error);
    
    // Fallback метаданные
    return {
      title: 'Эксклюзивный памятник | КР',
      description: 'Эксклюзивный памятник из гранита',
    };
  }
}

export default function ExclusiveMonumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
