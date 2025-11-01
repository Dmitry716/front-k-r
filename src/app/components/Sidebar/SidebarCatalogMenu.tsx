'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuCategories } from '../../mock/menuCategories';

const SidebarCatalogMenu = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    const activeCategoryFromPath = menuCategories.find(cat =>
        pathname.startsWith(cat.href)
    )?.name || null;

    // Определяем активную подкатегорию по пути
    const activeSubcategoryFromPath = menuCategories
        .flatMap(cat => cat.subcategories)
        .find(sub => pathname.includes(sub.href))?.name || null;

    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="bg-white rounded-xl animate-pulse h-96" />;
    }

    return (
        <div className="bg-white block rounded-xl">
            {/* Заголовок */}
            <div className="bg-[#2c3a54] text-white px-5 pt-4 pb-3.75 flex items-center space-x-5 rounded-t-xl">
                <svg className="mb-0.5" width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="18" height="2" fill="#ffffff" />
                    <rect x="0" y="5" width="18" height="2" fill="#ffffff" />
                    <rect x="0" y="10" width="18" height="2" fill="#ffffff" />
                </svg>
                <span className="font-bold leading-5">Весь каталог</span>
            </div>

            {/* Список категорий */}
            <ul className="relative border border-gray-200 rounded-b-xl">
                {menuCategories.map((category, index) => (
                    <li
                        key={index}
                        className=""
                        onMouseEnter={() => {
                            if (category.name !== activeCategoryFromPath && category.subcategories.length > 0) {
                                setHoveredCategory(category.name);
                            }
                        }}
                        onMouseLeave={() => {
                            if (category.name !== activeCategoryFromPath) {
                                setHoveredCategory(null);
                            }
                        }}
                    >
                        {category.name === activeCategoryFromPath ? (
                            <div
                                className={`flex items-center justify-between font-bold text-[#2c3a54] cursor-default ${category.name === 'Акции' ? 'text-[#cd5554] pt-2.5 pb-3.25 pl-6.25 pr-2.5' : 'py-1.25 pl-3.75 pr-10.5'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Image src={category.icon} alt={category.name} width={category.name === "Акции" ? 26 : 46} height={category.name === "Акции" ? 26 : 46} />
                                    <span>{category.name}</span>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={category.href!}
                                className={`flex items-center justify-between font-bold text-[#2c3a54] hover:bg-[#f5f6fa] transition-colors ${category.name === 'Акции' ? 'text-[#cd5554] pt-2.5 pb-3.25 pl-6.25 pr-2.5' : 'py-1.25 pl-3.75 pr-10.5'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Image src={category.icon} alt={category.name} width={category.name === "Акции" ? 26 : 46} height={category.name === "Акции" ? 26 : 46} />
                                    <span>{category.name}</span>
                                </div>
                                {category.subcategories.length > 0 && (
                                    <svg className="absolute right-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                )}
                            </Link>
                        )}

                        {/* 1. Выпадающее меню справа для НЕАКТИВНЫХ категорий при наведении */}
                        {category.name !== activeCategoryFromPath &&
                            hoveredCategory === category.name &&
                            category.subcategories.length > 0 && (
                                <div
                                    className="absolute left-full top-0 min-h-full mt-0 bg-white border border-gray-200 shadow-lg z-50 p-2 w-[500px]"
                                    style={{
                                        boxShadow: `0 0 30px 0 #2c3A5426`,
                                    }}
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        {category.subcategories.map((sub, idx) => (
                                            <Link
                                                key={idx}
                                                href={sub.href}
                                                className="flex items-center space-x-2 px-2.25 py-2 hover:bg-[#f5f6fa] rounded-md"
                                            >
                                                <Image
                                                    src={sub.img}
                                                    alt={sub.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded"
                                                />
                                                <span className="text-[#2c3a54]">{sub.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* 2. Список подкатегорий ПОД активной категорией */}
                        {category.name === activeCategoryFromPath && category.subcategories.length > 0 && (
                            <ul className="pl-18 py-1.25 space-y-1.5 mb-1 border-t border-gray-200">
                                {category.subcategories.map((sub, idx) => {
                                    const isActive = sub.name === activeSubcategoryFromPath;
                                    return (
                                        <li className='text-[14px]' key={idx}>
                                            <Link
                                                href={isActive ? '#' : sub.href}
                                                className={`block font-[600] w-max leading-5 text-[#2c3a54] ${isActive
                                                        ? 'pointer-events-none'
                                                        : 'hover:border-b-1 border-gray-200'
                                                    }`}
                                            >
                                                {sub.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarCatalogMenu;