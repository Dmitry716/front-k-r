import React from "react";
import { popularCategories } from "../mock/categories";

function IconArrow() {
  return (
    <svg
      className="w-5 h-5 ml-2 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function PopularCategories() {
  return (
    <section className="max-w-[1300px] container-centered mt-17 lg:mt-30">
      <h2 className="text-4xl font-bold text-[#2c3a54] md:ml-2.5 mb-3.5 md:mb-7.5">Популярные категории</h2>

      {/* Список для экранов <768px */}
      <div className="block md:hidden">
        <ul className="space-y-3">
          {popularCategories.map(({ title, img, link }) => (
            <li key={title}>
              <a
                href={link}
                className="flex items-center bg-[#f5f6fa] rounded-lg px-4 py-3 text-gray-800 "
              >
                <img
                  src={img}
                  alt={title}
                  className="w-8 h-8 object-contain mr-4"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <span className="flex-grow text-base font-medium">{title}</span>
                <IconArrow />
              </a>
            </li>
          ))}
        </ul>

        <button className="mt-6 w-full bg-[#2c3a54] text-white text-lg font-bold py-3 rounded-4xl">
          Смотреть весь каталог
        </button>
      </div>

      {/* Сетка для экранов >=768px (md и выше) */}
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-4">
        {popularCategories.map(({ title, price, img, link }) => (
          <div className="mt-5 px-2.5" key={title}>
            <a
              href={link}
              className="flex flex-col bg-[#f5f6fa] rounded-2xl px-2.5 pb-5 pt-0.75 text-[20px] text-center transition-shadow hover:shadow-md min-h-[320px]"
            >
              <img
                src={img}
                alt={title}
                className="mx-auto mb-4.5 object-contain"
                loading="lazy"
                width={198}
                height={198}
              />
              <h3 className="font-bold text-gray-800">{title}</h3>
              <div className="flex-grow" />
              <p className="text-[#cd5554] leading-6 min-h-[1.25rem]">
                {price && price.trim() !== "" ? price : "\u00A0"}
              </p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}