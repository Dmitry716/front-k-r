import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Контакты | КР',
    description: 'Свяжитесь с нами по телефону, электронной почте или приезжайте в наш офис',
  };
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
