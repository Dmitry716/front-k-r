import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata = await getMetadataForPage('discount',
      'Товары на скидке - Памятники и ограды со скидкой в Витебске | K-R.by',
      'Специальные предложения на памятники и ограды в Витебске. Акции и скидки на готовые изделия из гранита. Выгодные цены на качественную продукцию.'
    );
    
    if (metadata) {
      return metadata;
    }
  } catch (error: any) {
    // Ошибка сети при загрузке SEO данных - используем fallback
    if (error?.message?.includes('ENOTFOUND') || error?.cause?.code === 'ENOTFOUND') {
      console.warn('SEO data not available during build, using fallback');
    } else {
      console.error('Error loading SEO data:', error);
    }
  }

  // Fallback metadata
  return {
    title: 'Товары на скидке - Памятники и ограды со скидкой в Витебске | K-R.by',
    description: 'Специальные предложения на памятники и ограды в Витебске. Акции и скидки на готовые изделия из гранита. Выгодные цены на качественную продукцию.',
    keywords: 'памятники со скидкой, ограды со скидкой, акции памятники витебск, скидки гранит, памятники недорого',
  };
}

export default function DiscountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
