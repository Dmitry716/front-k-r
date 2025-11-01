'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { infoLinks } from '@/app/mock/sidebarInfo';

export default function SidebarInfoMenu() {
  const pathname = usePathname(); // Получаем текущий путь

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm py-5 px-4.5">
      {/* Заголовок */}
      <h3 className="text-[#2c3a54] text-[20px] font-bold mb-2.5">Информация</h3>

      {/* Список ссылок */}
      <ul className="space-y-1.25">
        {infoLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <li key={index}>
              {isActive ? (
                // Активная ссылка — не кликабельна, стилизуется иначе
                <span className="block text-[#2c3a54] cursor-default">
                  {link.name}
                </span>
              ) : (
                // Обычная ссылка
                <Link
                  href={link.href}
                  className="block text-[#2c3a54] hover:underline"
                >
                  {link.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}