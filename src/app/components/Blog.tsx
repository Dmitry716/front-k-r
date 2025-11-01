"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Данные акций
  const campaigns = [
    {
      id: 1,
      title: "Выбор памятника для мужчины и женщины: на что обратить внимание?",
      description: "Без переплат и без процентов!",
      image: "/blog/1.webp",
      date: "30.10.2023",
      link: "/",
    },
    {
      id: 2,
      title: "Выбор памятника для мужчины: строгость и надежность в камне",
      image: "/blog/2.webp",
      date: "30.10.2023",
      link: "/",
    },
    {
      id: 3,
      title: "Выбор памятника для ребенка: любовь и скорбь в камне",
      description:
        "При заказе памятника и благоустройства до 25 декабря 2023 года",
      image: "/blog/3.webp",
      date: "30.10.2023",
      link: "/",
    },
    {
      id: 4,
      title: "Гравировка или медальон на памятник: что лучше?",
      image: "/blog/4.webp",
      date: "30.10.2023",
      link: "/",
    },
  ];

  return (
    <section className="mt-17 lg:mt-30 gradient">
      <div className="max-w-[1300px] pt-[93px] container-centered">
        <h2 className="text-4xl font-bold text-[#2c3a54] ml-2.5 mb-7.5">
          Блог
        </h2>

        {/* Используем flex + gap, чтобы отступы не ломали ширину */}
        <div className="flex flex-col md:flex-row space-x-2.5 space-y-5 md:space-y-0">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="w-full md:w-1/4 md:mx-2.5 bg-white rounded-lg md:shadow-sm overflow-hidden"
            >
              <a href={campaign.link} className="flex md:block">
                <div className="w-[52%] px-2 md:px-0 bg-[#f5f6fa] md:w-full  ">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="max-w-full align-middle rounded-lg md:rounded-b-none h-auto"
                  />
                </div>
                <div className="w-[48%] justify-between flex flex-col md:block bg-[#f5f6fa] md:bg-white md:w-full px-2 py-0 md:px-6 md:py-5 md:p-6">
                  <h3 className="font-bold text-sm md:text-[16px] text-[#2c3a54] md:mb-1.25">
                    {campaign.title}
                  </h3>
                  <p className="hidden md:block text-[16px] text-[#2c3a54cc] leading-relaxed">
                    {campaign.description}
                  </p>
                  <span className="text-sm md:hidden text-[#2c3a54cc] leading-relaxed">
                    {campaign.date}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="ml-2.5 mt-6 md:mt-8 flex text-center">
          <Link
            href={"/"}
            className="font-bold w-full md:max-w-[338px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition"
          >
            Смотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
