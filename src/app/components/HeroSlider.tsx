"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Адаптивная высота
  const getSliderHeight = () => {
    if (windowWidth >= 768) {
      return "clamp(226px, 29.5vw, 400px)";
    } else if (windowWidth >= 601) {
      return "70vw";
    } else if (windowWidth >= 500) {
      return "85vw";
    } else if (windowWidth >= 425) {
      return "100vw";
    } else if (windowWidth >= 375) {
      return "112vw";
    } else if (windowWidth >= 320) {
      return "120vw";
    } else {
      return "138vw";
    }
  };

  // Определение размеров шрифтов
  const getFontSize = () => {
    if (windowWidth > 1280) {
      return {
        title: "36px",
        subtitle: "18px",
        button: "18px",
      };
    } else if (windowWidth > 1024) {
      return {
        title: "24px",
        subtitle: "18px",
        button: "18px",
      };
    } else if (windowWidth > 768) {
      return {
        title: "20px",
        subtitle: "16px",
        button: "18px",
      };
    } else {
      return {
        title: "20px",
        subtitle: "16px",
        button: "18px",
      };
    }
  };

  // Определение padding для контейнера
  const getPadding = () => {
    if (windowWidth > 1024) {
      return {
        x: "80px",
        y: "60px",
      };
    } else {
      return {
        x: "40px",
        y: "26px",
      };
    }
  };

  // Отслеживаем ширину окна
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      id: 1,
      image: "/sliders/single.webp",
      title: "Одиночные памятники",
      subtitle: "Классические и современные модели из высококачественного гранита",
      button: {
        text: "Смотреть каталог",
        href: "/monuments/single",
      },
    },
    {
      id: 2,
      image: "/sliders/composite.webp",
      title: "Составные памятники",
      subtitle: "Многоэлементные комплексы с богатым оформлением",
      button: {
        text: "Посмотреть модели",
        href: "/monuments/composite",
      },
    },
    {
      id: 3,
      image: "/sliders/exclusive.webp",
      title: "Эксклюзивные памятники",
      subtitle: "Уникальные авторские работы из редких пород гранита",
      button: {
        text: "Изучить коллекцию",
        href: "/monuments/exclusive",
      },
    },
    {
      id: 4,
      image: "/sliders/complex.webp",
      title: "Мемориальные комплексы",
      subtitle: "Полное благоустройство места захоронения с оградой",
      button: {
        text: "Узнать подробнее",
        href: "/monuments/complex",
      },
    },
    {
      id: 5,
      image: "/sliders/fences.webp",
      title: "Ограды для захоронений",
      subtitle: "Ограды на кладбище любой сложности",
      button: {
        text: "Выбрать ограду",
        href: "/fences",
      },
    },
  ];

  const totalSlides = slides.length;
  const slide = slides[currentSlide]

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

  const fontSize = getFontSize();
  const padding = getPadding();

  return (
    <div className="relative" style={{ height: getSliderHeight() }}>
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
            {/* Next.js Image для оптимизации */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              quality={90}
              sizes="(max-width: 768px) 100vw, 1300px"
              className="object-cover object-center"
            />
            
            {/* Контент слайда поверх изображения */}
            {windowWidth >= 768 ? (
              // Десктопная версия - текст слева
              <div
                className="relative z-20"
                style={{
                  paddingLeft: padding.x,
                  paddingRight: padding.x,
                  paddingTop: padding.y,
                  paddingBottom: padding.y,
                  minWidth: "45vw",
                  maxWidth: "54vw",
                  color: "#2c3a54",
                }}
              >
                <h2
                  className="font-bold mb-2"
                  style={{ fontSize: fontSize.title, paddingInlineEnd: "300px" }}
                >
                  {slide.title}
                </h2>
                <p
                  style={{
                    fontSize: fontSize.subtitle,
                    marginBottom: windowWidth > 1200 ? "56px" : "20px",
                  }}
                >
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.button.href}
                  className="bg-transparent px-6 py-3 border-2 border-[#2c3a54] rounded-full font-medium hover:bg-[#2c3a54] hover:text-white transition"
                  style={{
                    fontSize: fontSize.button,
                    padding: windowWidth > 1280 ? "11px 24px" : "10px 20px",
                  }}
                >
                  {slide.button.text}
                </Link>
              </div>
            ) : (
              // Мобильная версия - контент внизу поверх изображения
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pb-12 z-20">
                <h2
                  className="font-bold mb-2 text-white"
                  style={{ fontSize: fontSize.title }}
                >
                  {slide.title}
                </h2>
                <p className="mb-4 text-white/90" style={{ fontSize: fontSize.subtitle }}>
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.button.href}
                  className="inline-block bg-white text-[#2c3a54] px-4 py-2 rounded-full font-medium text-sm"
                >
                  {slide.button.text}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки навигации - за пределами контейнера */}
      {windowWidth >= 768 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition z-10 shadow-lg"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition z-10 shadow-lg"
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
      )}

      {/* Индикаторы */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 flex space-x-4 z-30 ${
          windowWidth < 768 ? "my-3" : "bottom-4"
        }`}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-[14px] h-[14px] rounded-full bg-white border-1 border-[#2c3a54] transition-colors flex items-center justify-center"
            type="button"
            aria-label={`Перейти к слайду ${index + 1}`}
          >
            {/* Активный — большой тёмный кружок внутри */}
            {index === currentSlide ? (
              <span className="w-[8px] h-[8px] rounded-full bg-[#2c3a54]"></span>
            ) : (
              // Неактивный — при hover появляется меньший тёмный кружок
              <span className="absolute w-[6px] h-[6px] rounded-full bg-[#2c3a54] opacity-0 hover:opacity-100 transition-opacity"></span>
            )}
          </button>
        ))}
      </div>
    </section>
    </div>
  );
};

export default HeroSlider;
