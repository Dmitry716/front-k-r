"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ReviewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false); // Только для мобильного
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width < 1024);
      setIsMobile(width < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Данные отзывов
  const reviews = [
    {
      id: 1,
      name: "Дмитрий Васильевич",
      date: "02.09.2024",
      rating: 5,
      text: "Заказывал памятник для дедушки с бабушкой сдвоенный с цельной плитой. С выбором материалов менеджеры помогали на все 100, что бы и достойно получилось и по деньгам нормально. Заказ выполнили в оговоренные сроки и даже немного раньше. На все просьбы и пожелания реагируют мгновенно и стараются сделать как можно лучше. Работой остался доволен. И уже даже люди которые на кладбище видели их работу спрашивали контакты компании.",
      source: "Отзыв из Google",
    },
    {
      id: 2,
      name: "Наталья Мартинкевич",
      date: "01.08.2024",
      rating: 5,
      text: "Очень довольны, что заказали памятник именно в «Каменная роза». Работа выполнена в срок, даже раньше, качественно, профессионально. Все сотрудники, с которыми приходилось общаться, вежливые, общительные, интеллигентные. С пониманием относятся к любым нашим вопросам. Огромное спасибо!",
      source: "Отзыв из Google",
    },
    {
      id: 3,
      name: "Мария Авхимович",
      date: "01.07.2024",
      rating: 5,
      text: 'Самые лучшие слова хочу сказать в адрес фирмы «Каменная роза». Все ее сотрудники - Илья, Михаил и Евгений - работают четко, профессионально, уважительно и вообще достойны всяческих похвал. Но особая моя благодарность Михаилу, автору памятника моей дочери, за креативность, нестандартное мышление, внимание к каждой детали и прекрасное исполнение. Памятник получился необычный и очень красивый! Считаю, что мне очень повезло, а фирму всем рекомендую.',
      source: "Отзыв из Google",
    },
    {
      id: 4,
      name: "Кононович Сергей",
      date: "10.09.2024",
      rating: 5,
      text: "Очень остались довольны качеством проделанной работой по установке памятника в k-r.by Все пожелания мною были услышаны , учтены и реализованы!!!! Говорим вам всему коллективу Большое Спасибо🙏🙏 Обязательно будем рекомендовать вас",
      source: "Отзыв из Google",
    },
    {
      id: 5,
      name: "Анна Петровна",
      date: "15.08.2024",
      rating: 5,
      text: "Заказывала памятник для мужа. Очень приятно удивлена качеством работы и отношением персонала. Все сделали точно в срок, даже чуть раньше. Менеджер всегда был на связи, отвечал на все вопросы. Памятник выглядит шикарно, как и обещали. Спасибо огромное!",
      source: "Отзыв из Google",
    },
    {
      id: 6,
      name: "Владимир Александрович",
      date: "20.07.2024",
      rating: 5,
      text: "Работа выполнена на высшем уровне. Менеджер помог подобрать идеальный вариант, который соответствовал нашему бюджету и вкусу. Установка прошла быстро и аккуратно. Очень благодарны за вашу работу!",
      source: "Отзыв из Google",
    },
    {
      id: 7,
      name: "Анна Петровна",
      date: "15.08.2024",
      rating: 4,
      text: "Заказывала памятник для мужа. Очень приятно удивлена качеством работы и отношением персонала. Все сделали точно в срок, даже чуть раньше. Менеджер всегда был на связи, отвечал на все вопросы. Памятник выглядит шикарно, как и обещали. Спасибо огромное!",
      source: "Отзыв из Google",
    },
    {
      id: 8,
      name: "Владимир Александрович",
      date: "20.07.2024",
      rating: 3,
      text: "Работа выполнена на высшем уровне. Менеджер помог подобрать идеальный вариант, который соответствовал нашему бюджету и вкусу. Установка прошла быстро и аккуратно. Очень благодарны за вашу работу!",
      source: "Отзыв из Google",
    },
  ];

  // Функции навигации
  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    } else if (isTablet) {
      setCurrentSlide((prev) => Math.min(prev + 1, reviews.length - 2));
    } else {
      setCurrentSlide((prev) => Math.min(prev + 1, reviews.length - 4));
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    } else if (isTablet) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index: number) => {
    if (isMobile) {
      setCurrentSlide(index);
    } else if (isTablet) {
      setCurrentSlide(Math.min(index, reviews.length - 2));
    } else {
      setCurrentSlide(Math.min(index, reviews.length - 4));
    }
  };

  // Обработка свайпа мышью
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Обработка свайпа пальцем
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      isDragging.current = false;
    }
  };

  // Добавляем и убираем слушатели событий
  useEffect(() => {
    if (typeof window !== "undefined" && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isMobile]);

  // Отображение звезд рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`inline-block w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
      >
        ★
      </span>
    ));
  };

  // Ширина одного слайда
  const slideWidth = isMobile ? 100 : isTablet ? 50 : 25;

  // Для мобильного режима: если showAllReviews === true — показываем все отзывы как статичный список
  const renderMobileReviews = () => {
    return reviews.map((review) => (
      <div
        key={review.id}
        className="w-full p-6 bg-[#f5f6fa]"
        style={{ padding: "0 0 17px", margin: "20px 0" }}
      >
        <div className="flex-1">
          <h3 className="font-bold text-lg text-[#2c3a54]">{review.name}</h3>
          <p
            className="text-sm text-gray-500 mt-1"
            style={{ fontSize: "12px", marginTop: "4px", lineHeight: "20px" }}
          >
            {review.date}
          </p>
          <div className="flex mt-2.25" style={{ marginTop: "9px" }}>
            {renderStars(review.rating)}
          </div>
          <p
            className="text-sm text-gray-700 mt-2"
            style={{
              marginTop: "8px",
              color: "#566176",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            {review.text}
          </p>
          <p
            className="text-sm text-[#2c3a54] font-bold mt-3.75"
            style={{
              fontSize: "16px",
              lineHeight: "22px",
              marginTop: "15px",
            }}
          >
            {review.source}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <section className="bg-[#f5f6fa]">
      <div className="max-w-[1300px] pt-17 md:pt-30 md:pb-[140px] container-centered">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-[#2c3a54] mb-4">
            Клиенты о нас
          </h2>

          {isMobile ? (
            // Мобильная версия: 3 кнопки + отдельная кнопка "Оставить отзыв"
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Link
                  href={"/"}
                  className="px-4.5 py-2.5 bg-[#2c3a54] text-white rounded-full border-1 border-[#2c3a54] hover:bg-white hover:text-[#2c3a54]"
                >
                  Все отзывы
                </Link>
                <div className="flex items-center space-x-2">
                  <Link href={'/'} className="px-4.5 py-2.5 bg-white border border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white rounded-full flex items-center justify-center">
                    <Image
                      src="/review/1.webp"
                      alt="Google"
                      width={21}
                      height={21}
                      className="mr-2.5"
                    />
                    <span className="text-md leading-5.5 text-[#2c3a54]">
                      5.0
                    </span>
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={'/'} className="px-4.5 py-2.5 bg-white border border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white rounded-full flex items-center justify-center">
                    <Image
                      src="/review/2.webp"
                      alt="Yandex"
                      width={21}
                      height={21}
                      className="mr-2.5"
                    />
                    <span className="text-md leading-5.5 text-[#2c3a54]">
                      4.9
                    </span>
                  </Link>
                </div>
              </div>
              <Link href={'/'} className="w-full text-center px-3.75 py-2.25 border border-[#2c3a54] text-[#2c3a54] rounded-full font-bold hover:bg-[#2c3a54] hover:text-white transition">
                Оставить свой отзыв
              </Link>
            </div>
          ) : (
            // Десктоп/планшет: 3 кнопки + кнопка "Оставить отзыв" в одной строке с разделителем
            <div className="flex items-center space-x-4">
              <Link
                href={"/"}
                className="px-4.5 py-2.5 bg-[#2c3a54] text-white rounded-full border-1 border-[#2c3a54] hover:bg-white hover:text-[#2c3a54]"
              >
                Все отзывы
              </Link>
              <div className="flex items-center space-x-2">
                <Link href={'/'} className="px-4.5 py-2.5 bg-white border border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white rounded-full flex items-center justify-center">
                  <Image
                    src="/review/1.webp"
                    alt="Google"
                    width={21}
                    height={21}
                    className="mr-2.5"
                  />
                  <span className="text-md leading-5.5 text-[#2c3a54]">
                    5.0
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={'/'} className="px-4.5 py-2.5 bg-white border border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white rounded-full flex items-center justify-center">
                  <Image
                    src="/review/2.webp"
                    alt="Yandex"
                    width={21}
                    height={21}
                    className="mr-2.5"
                  />
                  <span className="text-md leading-5.5 text-[#2c3a54]">
                    4.9
                  </span>
                </Link>
              </div>
              <div className="border-l border-gray-300 mx-4 h-8"></div>
              <Link href={'/'} className="px-3.75 py-2.25 border border-[#2c3a54] text-[#2c3a54] rounded-full font-bold hover:bg-[#2c3a54] hover:text-white transition">
                Оставить свой отзыв
              </Link>
            </div>
          )}
        </div>

        {/* Слайдер (только если НЕ мобильный или мобильный, но НЕ показаны все отзывы) */}
        {!isMobile || !showAllReviews ? (
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * slideWidth}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`flex-shrink-0 ${isMobile ? "w-full bg-[#f5f6fa]" : isTablet ? "w-1/2 shadow-sm" : "w-1/4 shadow-sm"
                    } p-6 bg-white relative`}
                  style={
                    isMobile
                      ? { padding: "0 0 17px", margin: "20px 0" }
                      : { padding: "33px 24px 67px" }
                  }
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#2c3a54]">
                      {review.name}
                    </h3>
                    <p
                      className="text-sm text-gray-500 mt-1"
                      style={{
                        fontSize: "12px",
                        marginTop: "4px",
                        lineHeight: "20px",
                      }}
                    >
                      {review.date}
                    </p>
                    <div className="flex mt-2.25" style={{ marginTop: "9px" }}>
                      {renderStars(review.rating)}
                    </div>
                    <p
                      className="text-sm text-gray-700 mt-2"
                      style={{
                        marginTop: "8px",
                        color: "#566176",
                        fontSize: "14px",
                        lineHeight: "22px",
                      }}
                    >
                      {review.text}
                    </p>
                    {/* Позиционирование "Отзыв из Google" — абсолютное для >=768px, margin-top для <768px */}
                    <p
                      className={`text-sm text-[#2c3a54] font-bold ${isMobile ? "mt-3.75" : "absolute bottom-8.25 left-6"
                        }`}
                      style={
                        isMobile
                          ? {
                            fontSize: "16px",
                            lineHeight: "22px",
                            marginTop: "15px",
                          }
                          : {
                            fontSize: "16px",
                            lineHeight: "22px",
                          }
                      }
                    >
                      {review.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Индикаторы — только если НЕ мобильный ИЛИ если мобильный, но НЕ показаны все отзывы */}
        {!isMobile && !showAllReviews && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from(
              {
                length: isMobile
                  ? reviews.length
                  : isTablet
                    ? reviews.length - 1
                    : reviews.length - 3,
              },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full ${index === currentSlide ? "bg-[#2c3a54]" : "bg-gray-300"
                    }`}
                ></button>
              )
            )}
          </div>
        )}

        {/* Кнопка "Показать ещё" — только на мобильных, если не показаны все отзывы */}
        {isMobile && !showAllReviews && (
          <div className="mt-6">
            <button
              onClick={() => setShowAllReviews(true)}
              className="w-full py-3 bg-[#2c3a54] text-white rounded-full font-bold text-center hover:bg-opacity-90 transition"
            >
              Показать ещё
            </button>
          </div>
        )}

        {/* Если мобильный и показаны все отзывы — рендерим весь список статично */}
        {isMobile && showAllReviews && (
          <div className="mt-6">{renderMobileReviews()}</div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSlider;
