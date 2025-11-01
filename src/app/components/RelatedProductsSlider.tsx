"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { productsMonuments } from "../mock/products";
import ProductCard from "./ProductCard";

const RelatedProductsSlider = () => {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Все");

  // Для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width < 1200);
      setIsMobile(width < 768);
      setIsNarrowMobile(width < 420)
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Функции для навигации слайдера (скролл на ширину 4 карточек на десктопе)
  const getVisibleCards = () => (isTablet ? 1 : 4); // На десктопе 4, на мобиле 1 (адаптируем позже)
  const getSlideWidth = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const visibleCards = getVisibleCards();
    return containerWidth / visibleCards; // Ширина одной карточки = контейнер / visible
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const slideWidth = getSlideWidth();
      const scrollAmount = slideWidth * getVisibleCards(); // По 4 карточки (или по visible на мобиле)
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const slideWidth = getSlideWidth();
      const scrollAmount = slideWidth * getVisibleCards();
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

// Фильтр только товары со скидкой (discount !== undefined)
const discountedProducts = productsMonuments
  .filter((p) => p.discount !== undefined)
  .filter(
    (product) =>
      activeCategory === "Все" || product.category === activeCategory
  );
  
  return (
    <section className="max-w-[1300px]  mt-17 lg:mt-30 container-centered">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-6">
        Товары со скидкой
      </h2>

      {/* Панель категорий */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "Все",
          "Одиночные",
          "Двойные",
          "Эксклюзивные",
          "Гранитные ограды",
        ].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 border border-gray-300 rounded-full text-[16px] font-medium transition ${
              activeCategory === category
                ? "bg-[#2c3a54] text-white"
                : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative">
        {!isMobile && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-[-16px] border border-[#2c3a54] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2c3a54"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div
              ref={sliderRef}
              className="flex overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{
                scrollSnapType: "x mandatory",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} isTablet={isTablet} isMobile={isMobile} isNarrowMobile={isNarrowMobile}/>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-[-16px] border border-[#2c3a54] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2c3a54"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        {isMobile && (
          <div className="grid grid-cols-2 ">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} isTablet={isTablet} isMobile={isMobile} isNarrowMobile={isNarrowMobile}/>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка внизу */}
      <div className="mt-10 flex">
        <button className="font-bold md:min-w-[330px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition">
          <Link href="/">Смотреть все</Link>
        </button>
      </div>
    </section>
  );  
};

export default RelatedProductsSlider;
