// components/SidebarInfoAccordion.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { infoLinks } from '@/app/mock/sidebarInfo';
import Image from 'next/image';

export default function SidebarInfoDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white border-b border-t border-gray-200 mb-5">
            {/* Заголовок */}
            <button
                onClick={toggleMenu}
                className={`w-full flex justify-between items-center px-5 py-3.75 text-[#2c3a54] transition-colors ${isOpen ? 'bg-[#2c3a54] text-white' : 'hover:bg-[#f9fafb]'
                    }`}
                aria-expanded={isOpen}
            >
                <span className="font-[600]">Информация</span>
                <Image
                    src={`${isOpen ? "/arrow-white.svg" : "/arrow-gray.svg"}`}
                    alt="Раскрыть"
                    width={18}
                    height={12}
                    className={`transform transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Список ссылок */}
            <ul
                className={`overflow-hidden transition-all font-[600] duration-300 ease-in-out ${isOpen ? 'max-h-full' : 'max-h-0'
                    }`}
            >
                {infoLinks.map((link, index) => {
                    const isActive = pathname === link.href;

                    return (
                        <li key={index} className="border-b border-[#dee5e8] ml-5 last:border-b-0">
                            {isActive ? (
                                <span className="block py-3.75 pl-0 pr-5 text-[#cbcbcb] cursor-default">
                                    {link.name}
                                </span>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="block py-3.75 pl-0 pr-5 text-[#2c3a54] hover:text-[#2c3a54cc] transition"
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