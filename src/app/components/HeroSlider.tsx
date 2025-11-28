"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  // Slider sizing and typography switched to responsive Tailwind classes

  const slides = [
    {
      id: 1,
      imageDesktop: "/sliders/1.webp",
      imageMobile: "/sliders/1m.webp",
      title: "Гранитные памятники",
      subtitle: "700+ уникальных моделей эксклюзивных и классических памятников",
      button: {
        text: "Смотреть каталог",
        href: "/monuments",
      },
      color: "#2c3a54"
    },
    {
      id: 2,
      imageDesktop: "/sliders/2.webp",
      imageMobile: "/sliders/2m.webp",
      title: "Готовые памятники с оформлением у нас в офисе",
      subtitle: "Десятки вариантов гранита, материалов для благоустройства, вариантов оформления и аксессуаров",
      button: {
        text: "Подробнее",
        href: "/contacts",
      },
      color: "#fff"
    },
  ];

  const totalSlides = slides.length;

  // Автоплей
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 секунд
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Обработка свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative" style={{ height: 'clamp(226px, 29.5vw, 400px)' }}>
      <section
        className="max-w-[1300px] container-centered h-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Слайды с Next.js Image */}
        <div className="h-full relative overflow-hidden rounded-xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Мобильное изображение */}
            <Image
              src={slide.imageMobile}
              alt={slide.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "low"}
              quality={index === 0 ? 75 : 60}
              sizes="(max-width: 768px) 100vw, 0px"
              className="object-cover object-center md:hidden"
            />
            
            {/* Десктопное изображение */}
            <Image
              src={slide.imageDesktop}
              alt={slide.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "low"}
              quality={index === 0 ? 75 : 60}
              sizes="(max-width: 768px) 0px, 1300px"
              className="object-cover object-center hidden md:block"
            />
            
            {/* Контент слайда поверх изображения */}
            
            {/* Десктопная версия - текст слева */}
            <div
              className="relative z-20 hidden md:flex md:items-center md:px-20 md:py-[60px] px-10 py-[26px]"
              style={{ color: slide.color }}
            >
              <div className="md:w-[45vw] md:max-w-[54vw]">
                <h2 className="font-bold mb-2 text-[20px] md:text-[24px] lg:text-[36px]">
                  {slide.title}
                </h2>
                <p className="mb-14 text-[16px] md:text-[18px]">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.button.href}
                  className="bg-transparent px-6 py-3 border-2 border-[#2c3a54] rounded-full font-medium hover:bg-[#2c3a54] hover:text-white transition text-[18px]"
                >
                  {slide.button.text}
                </Link>
              </div>
            </div>

            {/* Мобильная версия - контент внизу поверх изображения */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/60 to-transparent p-4 pb-12 z-20 md:hidden">
              <h2 className="font-bold mb-2 text-white text-[20px]">{slide.title}</h2>
              <p className="mb-4 text-white/90 text-[16px]">{slide.subtitle}</p>
              <Link
                href={slide.button.href}
                className="inline-block bg-white text-[#2c3a54] px-4 py-2 rounded-full font-medium text-sm"
              >
                {slide.button.text}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации - за пределами контейнера */}
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 w-10 h-10 bg-white bg-opacity-80 rounded-full items-center justify-center hover:bg-opacity-100 transition z-10 shadow-lg"
            style={{ top: 'calc(50% - 20px)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 w-10 h-10 bg-white bg-opacity-80 rounded-full items-center justify-center hover:bg-opacity-100 transition z-10 shadow-lg"
            style={{ top: 'calc(50% - 20px)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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

      {/* Индикаторы */}
      <div className="absolute left-1/2 -translate-x-1/2 flex space-x-4 z-30 bottom-3 md:bottom-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-3.5 h-3.5 rounded-full bg-white border border-[#2c3a54] transition-colors flex items-center justify-center"
            type="button"
            aria-label={`Перейти к слайду ${index + 1}`}
          >
            {/* Активный — большой тёмный кружок внутри */}
            {index === currentSlide ? (
              <span className="w-2 h-2 rounded-full bg-[#2c3a54]"></span>
            ) : (
              // Неактивный — при hover появляется меньший тёмный кружок
              <span className="absolute w-1.5 h-1.5 rounded-full bg-[#2c3a54] opacity-0 hover:opacity-100 transition-opacity"></span>
            )}
          </button>
        ))}
      </div>
    </section>
    </div>
  );
};

export default HeroSlider;
