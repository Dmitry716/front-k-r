import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Политика конфиденциальности | КР',
    description: 'Политика конфиденциальности и обработки персональных данных',
  };
}

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
