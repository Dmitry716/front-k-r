'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FooterMenu from "./FooterMenu";
import ScrollToTop from "./ScrollToTop";
import CookieConsent from "./CookieConsent";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Для админки - только children без Header/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Для обычных страниц - полная вёрстка
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <FooterMenu />
    </div>
  );
}
