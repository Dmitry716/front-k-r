import type { Metadata } from "next";
import { Viewport } from "next";
import "./globals.css";
import { DropdownProvider } from "./context/DropDownContext";
import { AdminProtector } from "./components/AdminProtector";
import YandexMetrika from "./components/YandexMetrika";
import SchemaOrg from "./components/SchemaOrg";
import { schemaOrganization } from "@/lib/seo-schema";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterMenu from "./components/FooterMenu";
import CookieConsent from "./components/CookieConsent";
import ScrollToTop from "./components/ScrollToTop";

// Viewport configuration для мобильных браузеров
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2c3a54",
};

// Default metadata для корневого layout - используется как fallback
export const metadata: Metadata = {
  title: "Каменная Роза в Витебске",
  description:
    "Производство и установка памятников, оград, аксессуаров из гранита.",
  metadataBase: new URL("https://k-r.by"),
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-192x192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
  other: {
    "theme-color": "#2c3a54",
    "msapplication-TileColor": "#2c3a54",
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
        {/* Favicon ссылки для всех браузеров */}
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="mask-icon" href="/favicon-192x192.webp" color="#2c3a54" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
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
        
        {/* Preload LCP изображений */}
        <link
          rel="preload"
          as="image"
          href="/sliders/single.webp"
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
        <ScrollToTop />
        <DropdownProvider>
          <AdminProtector>
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
