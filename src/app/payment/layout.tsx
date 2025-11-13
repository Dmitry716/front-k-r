import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Оплата заказа | КР',
    description: 'Способы оплаты заказа памятников и доставки',
  };
}

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
