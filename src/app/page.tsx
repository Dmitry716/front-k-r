import { Metadata } from 'next';
import { getMetadataForPage } from '@/lib/seo-metadata';
import { generateOpenGraphMetadata } from '@/lib/open-graph';
import dynamic from 'next/dynamic';

// Критические компоненты - загружаем сразу
import HeroSlider from "./components/HeroSlider";
import PopularCategories from "./components/PopularCategories";
import StoreInfo from "./components/StoreInfo";

// Некритические компоненты - ленивая загрузка
const PopularProducts = dynamic(() => import("./components/PopularProducts"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const RelatedProductsSlider = dynamic(() => import("./components/RelatedProductsSlider"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});
const CompleteSolutionSlider = dynamic(() => import("./components/CompleteSolutionSlider"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});
const PaymentInfo = dynamic(() => import("./components/PaymentInfo"), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});
const OurWorksSlider = dynamic(() => import("./components/OurWorksSlider"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const OrderStepsSection = dynamic(() => import("./components/OrderStepsSection"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});
const WhyTrustUs = dynamic(() => import("./components/WhyTrustUs"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});
const ReviewsSlider = dynamic(() => import("./components/ReviewsSlider"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const Promo = dynamic(() => import("./components/Promo"), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});
const Blog = dynamic(() => import("./components/Blog"), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const FAQ = dynamic(() => import("./components/FAQ"), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});

// Генерируем метаданные для SEO
export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata = await getMetadataForPage(
    'home',
    'Памятники и памятные комплексы из гранита | КР',
    'Изготовление и продажа памятников из гранита, оград и памятных комплексов'
  );

  return {
    ...baseMetadata,
    ...generateOpenGraphMetadata(
      'Каменная Роза - Памятники из гранита в Витебске',
      'Производство и установка памятников, оград и аксессуаров из гранита. Качество, надежность, индивидуальный подход.',
      'https://k-r.by/monuments.jpg',
      'https://k-r.by',
      'website'
    ),
  };
}

export default function Home() {
   return (
    <main>
        <HeroSlider/>
        <PopularCategories />
        <StoreInfo />
        <PopularProducts />
        <RelatedProductsSlider />
        <CompleteSolutionSlider />
        {/* <BannerForm /> */}
        <OurWorksSlider />
        <PaymentInfo />
        <OrderStepsSection />
        <WhyTrustUs />
        <ReviewsSlider />
        <Promo />
        <Blog />
        <FAQ />
    </main>
  );
}
