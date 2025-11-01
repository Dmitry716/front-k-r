"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { productsMonuments } from "../mock/products";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);

  // Для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width < 1024);
      setIsMobile(width < 768);
      setIsNarrowMobile(width < 420);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Фильтруем товары по категории
  const filteredProducts =
    activeCategory === "Все"
      ? productsMonuments
      : productsMonuments.filter((product) => product.category === activeCategory);

  return (
    <section className="max-w-[1300px] mt-17 lg:mt-30 container-centered">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-3.5 md:mb-7.5">
        Популярные товары
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
            className={`px-4 py-2 border-1 border-gray-300 rounded-full text-[16px] font-medium transition ${activeCategory === category
                ? "bg-[#2c3a54] text-white"
                : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Грид товаров */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} isTablet={isTablet} isMobile={isMobile} isNarrowMobile={isNarrowMobile}/>
        ))}
      </div>
      {/* Кнопки внизу */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 font-bold">
        <button className="md:min-w-[330px] px-7.5 py-3 bg-white border border-[#2c3a54] text-[#2c3a54] rounded-full hover:bg-[#2c3a54] hover:text-white transition">
          <Link href="/">Показать все</Link>
        </button>
        <button className="md:min-w-[330px] px-7.5 py-3 bg-[#2c3a54] text-white rounded-full hover:bg-white hover:border-1 hover:border-[#2c3a54] hover:text-[#2c3a54] transition">
          <Link href="/">Перейти в каталог</Link>
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;
