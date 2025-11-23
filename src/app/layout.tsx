import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterMenu from "./components/FooterMenu";
import ScrollToTop from "./components/ScrollToTop";
import { DropdownProvider } from "./context/DropDownContext";
import { AdminProtector } from "./components/AdminProtector";
import YandexMetrika from "./components/YandexMetrika";
import CookieConsent from "./components/CookieConsent";
import SchemaOrg from "./components/SchemaOrg";
import { schemaOrganization } from "@/lib/seo-schema";

// Default metadata для корневого layout - используется как fallback
export const metadata: Metadata = {
  title: "Каменная Роза в Витебске",
  description:
    "Производство и установка памятников, оград, аксессуаров из гранита.",
  metadataBase: new URL("https://k-r.by"),
  robots: "index, follow",
  openGraph: {
    title: "Каменная Роза в Витебске",
    description:
      "Производство и установка памятников, оград, аксессуаров из гранита.",
    url: "https://k-r.by",
    type: "website",
    images: [
      {
        url: "https://k-r.by/monuments.jpg",
        width: 1200,
        height: 630,
        alt: "Каменная Роза",
      },
    ],
    siteName: "Каменная Роза",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Каменная Роза в Витебске",
    description:
      "Производство и установка памятников, оград, аксессуаров из гранита.",
    images: ["https://k-r.by/monuments.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Critical inline CSS to prevent layout shift */}
        <style dangerouslySetInnerHTML={{ __html: `
          main.min-h-screen>div:first-child{height:400px!important}
          @media(max-width:1299px){main.min-h-screen>div:first-child{height:clamp(226px,29.5vw,400px)!important}}
          @media(max-width:767px){main.min-h-screen>div:first-child{height:70vw!important}}
          @media(max-width:600px){main.min-h-screen>div:first-child{height:85vw!important}}
          @media(max-width:499px){main.min-h-screen>div:first-child{height:100vw!important}}
          @media(max-width:424px){main.min-h-screen>div:first-child{height:112vw!important}}
          @media(max-width:374px){main.min-h-screen>div:first-child{height:120vw!important}}
          @media(max-width:319px){main.min-h-screen>div:first-child{height:138vw!important}}
        ` }} />
        
        {/* Preload критических шрифтов для устранения блокировки */}
        <link
          rel="preload"
          href="/fonts/LatoRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/LatoBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        
        {/* Preload LCP изображений - mobile first */}
        <link
          rel="preload"
          as="image"
          href="/sliders/single.webp"
          imageSrcSet="/_next/image?url=%2Fsliders%2Fsingle.webp&w=640&q=85 640w, /_next/image?url=%2Fsliders%2Fsingle.webp&w=768&q=85 768w"
          imageSizes="(max-width: 768px) 100vw"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/section/cheap.webp"
          fetchPriority="high"
        />
        
        <SchemaOrg schema={schemaOrganization} />
      </head>
      <body className="min-w-[360px]">
        <YandexMetrika />
        <DropdownProvider>
          <AdminProtector>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
            <FooterMenu />
            <CookieConsent />
          </AdminProtector>
        </DropdownProvider>
      </body>
    </html>
  );
}
