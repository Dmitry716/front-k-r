import type { Metadata } from "next";
import "./globals.css";
import { DropdownProvider } from "./context/DropDownContext";
import { AdminProtector } from "./components/AdminProtector";
import YandexMetrika from "./components/YandexMetrika";
import SchemaOrg from "./components/SchemaOrg";
import { schemaOrganization } from "@/lib/seo-schema";
import LayoutWrapper from "./components/LayoutWrapper";

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
        <DropdownProvider>
          <AdminProtector>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AdminProtector>
        </DropdownProvider>
      </body>
    </html>
  );
}
