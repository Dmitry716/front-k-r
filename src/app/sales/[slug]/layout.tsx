import { Metadata, ResolvingMetadata } from 'next';
import { getMetadataForCampaign } from '@/lib/entity-seo-metadata';

interface CampaignLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(
  props: CampaignLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  // Загружаем SEO данные кампании
  return await getMetadataForCampaign(slug);
}

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
