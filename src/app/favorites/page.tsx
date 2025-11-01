// src/app/favorites/page.tsx

"use client";
import { useEffect, useState } from "react";
import OurWorksSlider from "../components/OurWorksSlider";
import PathPage from "../components/PathPage";
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp";
import ProductCard from "../components/ProductCard";
import { productsMonuments } from "../mock/products";
import Pagination from "../components/Pagination";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<typeof productsMonuments>([]);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 12;

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            setIsTablet(window.innerWidth < 1024);
            setIsMobile(window.innerWidth < 768);
            setIsNarrowMobile(window.innerWidth < 420);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Загружаем избранные товары при загрузке
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    // Фильтруем продукты по ID из избранного
    useEffect(() => {
        const filtered = productsMonuments.filter(p => favorites.includes(p.id));
        setFavoriteProducts(filtered);
    }, [favorites]);

    useEffect(() => {
        const handleFavoritesChange = () => {
            const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            setFavorites(savedFavorites);
            setCurrentPage(1); // Сбрасываем на первую страницу при изменении
        };

        // Подписываемся на кастомное событие
        window.addEventListener('favoritesChanged', handleFavoritesChange);

        // Очистка подписки
        return () => {
            window.removeEventListener('favoritesChanged', handleFavoritesChange);
        };
    }, []);

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(favoriteProducts.length / PRODUCTS_PER_PAGE);

    // Получаем продукты для текущей страницы
    const currentProducts = favoriteProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Товары в избранном</h1>

                    {/* Сетка избранных продуктов */}
                    {favoriteProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 mb-7.5">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isTablet={isTablet}
                                    isMobile={isMobile}
                                    isNarrowMobile={isNarrowMobile}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#2D4266]">В избранном пока нет товаров.</p>
                    )}

                    {/* Пагинация */}
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        initialPage={1}
                    />v
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-22.5">
                <OurWorksSlider />
            </div>
        </>
    );
};

export default FavoritesPage;