import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterMenu from "./components/FooterMenu";
import ScrollToTop from "./components/ScrollToTop";
import { DropdownProvider } from "./context/DropDownContext";

export const metadata: Metadata = {
  title: "Каменная Роза в Витебске",
  description:
    "Производство и установка памятников, оград, аксессуаров из гранита.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-w-[360px]">
      <DropdownProvider>
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
        <FooterMenu />
    </DropdownProvider>
      </body>
    </html>
  );
}
