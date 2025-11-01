// src/components/ProductCard.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ColorOption, Product } from "../types/types";

interface ProductCardProps {
  product: Product;
  isTablet: boolean;
  isMobile: boolean;
  isNarrowMobile: boolean;
}

// Функция для формирования ссылки на товар в зависимости от категории
const generateProductHref = (product: Product): string => {
  // Если это памятник
  if (['Одиночные', 'Двойные', 'Эксклюзивные', 'Недорогие', 'В виде креста', 'В виде сердца', 'Составные', 'Европейские', 'Художественная  резка', 'В виде деревьев', 'Мемориальные Комплексы', 'Бюджетные'].includes(product.category)) {
    // Маппим названия категорий в URL slugs
    const categoryMap: Record<string, string> = {
      'Одиночные': 'single',
      'Двойные': 'double',
      'Эксклюзивные': 'exclusive',
      'Недорогие': 'cheap',
      'В виде креста': 'cross',
      'В виде сердца': 'heart',
      'Составные': 'composite',
      'Европейские': 'europe',
      'Художественная  резка': 'artistic',
      'В виде деревьев': 'tree',
      'Мемориальные Комплексы': 'complex',
      'Бюджетные': 'budget',
    };
    const categorySlug = categoryMap[product.category] || 'single';
    return `/monuments/${categorySlug}/${product.slug}`;
  }

  // Если это ограда
  if (['Гранитные ограды', 'С полимерным покрытием', 'Металлические ограды'].includes(product.category)) {
    const categoryMap: Record<string, string> = {
      'Гранитные ограды': 'granite',
      'С полимерным покрытием': 'polymer',
      'Металлические ограды': 'metal',
    };
    const categorySlug = categoryMap[product.category] || 'granite';
    return `/fences/${categorySlug}/${product.slug}`;
  } 

  // Если это аксессуар
  if (['Вазы', 'Лампады', 'Скульптуры', 'Рамки', 'Изделия из бронзы', 'Таблички'].includes(product.category)) {
    const categoryMap: Record<string, string> = {
      'Вазы': 'vases',
      'Лампады': 'lamps',
      'Скульптуры': 'sculptures',
      'Рамки': 'frames',
      'Изделия из бронзы': 'bronze',
      'Таблички': 'plates',
    };
    const categorySlug = categoryMap[product.category] || 'vases';
    return `/accessories/${categorySlug}/${product.slug}`;
  }

  // Если это ландшафт
  if (['Столы и скамейки', 'Щебень декоративный', 'Металлические элементы'].includes(product.category)) {
    const categoryMap: Record<string, string> = {
      'Столы и скамейки': 'benches',
      'Щебень декоративный': 'gravel',
      'Металлические элементы': 'metal-elements',
    };
    const categorySlug = categoryMap[product.category] || 'tables';
    return `/landscape/${categorySlug}/${product.slug}`;
  }

  // Fallback
  return '';
};

const ProductCard = ({
  product,
  isTablet,
  isMobile,
  isNarrowMobile,
}: ProductCardProps) => {
  const [hoveredColorIndex, setHoveredColorIndex] = useState(0);
  const [showIndicators, setShowIndicators] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); 
  const imageRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Инициализация состояния из localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  // Инициализация дефолтного цвета на планшете
  useEffect(() => {
    setSelectedColorIndex(0);
  }, [product.id]);

  // Пока не на клиенте — рендерим "нейтральную" версию
  if (!isClient) {
    return (
      <div className="relative bg-gray-200 animate-pulse">Загрузка...</div>
    );
  }

  // Проверяем, существуют ли цвета и есть ли в них хотя бы один элемент
  const productColors: ColorOption[] = Array.isArray(product.colors)
    ? product.colors
    : [];

  const hasColors = productColors.length > 0;

  // expandedColors = массив цветов (первый всегда дефолт из БД)
  const expandedColors: ColorOption[] = productColors;

  // Изображение для отображения
  const displayImage = isTablet
    ? (expandedColors[selectedColorIndex]?.image || product.image)
    : (expandedColors[hoveredColorIndex]?.image || product.image);

  // Получаем текущий выбранный/hovered цвет
  const currentColorIndex = isTablet ? selectedColorIndex : hoveredColorIndex;
  const currentColor = expandedColors[currentColorIndex];

  // Используем цену и скидку ТЕКУЩЕГО выбранного цвета (не дефолта!) с fallback на основные свойства продукта
  const currentPrice = currentColor?.price ?? product.price;
  const currentOldPrice = currentColor?.oldPrice ?? product.oldPrice;
  const currentDiscount = currentColor?.discount ?? product.discount;

  // Функция для отображения цены
  const formatPriceDisplay = (price: number | null | undefined, description?: string | null): string | null => {
    // Если есть описание с текстовой ценой (для новых категорий памятников)
    if (description && (description.includes('цена по запросу') || description.includes('под заказ'))) {
      return 'цена по запросу';
    }
    
    // Если цена равна 0, null или undefined, показываем "цена по запросу"
    if (!price || price === 0) {
      return 'цена по запросу';
    }
    
    return null; // Используем обычную логику отображения цены
  };

  // Проверяем, нужно ли показать специальный текст цены
  const specialPrice = formatPriceDisplay(currentPrice, product.description);
  const shouldUseSpecialPrice = specialPrice !== null;

  // Есть ли скидка на текущем выбранном/наведенном цвете
  const hasDiscount = (() => {
    const result = (() => {
      // Если нет цветов вообще, проверяем скидку основного товара
      if (!hasColors) {
        return product.discount !== null && product.discount !== undefined && product.discount > 0;
      }
      
      // Если есть цвета, проверяем скидку у конкретного цвета
      if (hasColors && currentColor) {
        // Проверяем, есть ли у этого цвета собственная скидка в исходных данных
        // Если discount у цвета null, undefined или 0 - значит у него нет скидки
        const colorOriginalDiscount = currentColor.discount;
        
        // Если у цвета есть собственная скидка (не null/undefined и больше 0)
        if (colorOriginalDiscount !== null && colorOriginalDiscount !== undefined && 
            Number(colorOriginalDiscount) > 0) {
          return true;
        }
        
        // Если мы на первом цвете и у него нет собственной скидки,
        // но есть скидка на основном товаре - показываем скидку основного товара
        if (currentColorIndex === 0 && 
            (colorOriginalDiscount === null || colorOriginalDiscount === undefined || Number(colorOriginalDiscount) === 0)) {
          return product.discount !== null && product.discount !== undefined && Number(product.discount) > 0;
        }
      }
      
      return false;
    })();

    return result;
  })();

  // Обработчик свайпа по изображению (адаптирован из вашего кода)
  const handleTouchStartImage = (e: React.TouchEvent) => {
    if (isTablet) {
      const startX = e.touches[0].clientX;
      const startY = e.touches[0].clientY;
      const onTouchMoveImg = (e: TouchEvent) => {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;
        e.preventDefault();
      };
      const onTouchEndImg = (e: TouchEvent) => {
        document.removeEventListener("touchmove", onTouchMoveImg);
        document.removeEventListener("touchend", onTouchEndImg);
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
          const direction = deltaX > 0 ? -1 : 1;
          const newIndex =
            (selectedColorIndex + direction + expandedColors.length) %
            expandedColors.length;
          setSelectedColorIndex(newIndex);
        }
      };
      document.addEventListener("touchmove", onTouchMoveImg);
      document.addEventListener("touchend", onTouchEndImg);
    } else {
      const startX = e.touches[0].clientX;
      const onTouchEndDesktop = (e: TouchEvent) => {
        document.removeEventListener("touchend", onTouchEndDesktop);
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
          const direction = deltaX > 0 ? -1 : 1;
          const newIndex = Math.max(
            0,
            Math.min(expandedColors.length - 1, hoveredColorIndex + direction)
          );
          setHoveredColorIndex(newIndex);
          setShowIndicators(true);
        }
      };
      document.addEventListener("touchend", onTouchEndDesktop);
    }
  };

  // Обработчик движения мыши для расчета сегмента
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || expandedColors.length === 1) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    setShowIndicators(true);
    const indicatorStart = 0.1 * width;
    const indicatorEnd = 0.9 * width;
    const indicatorWidth = indicatorEnd - indicatorStart;
    const totalSegments = expandedColors.length;
    let newIndex;
    if (x < indicatorStart) {
      newIndex = 0;
    } else if (x > indicatorEnd) {
      newIndex = totalSegments - 1;
    } else {
      const ratio = (x - indicatorStart) / indicatorWidth;
      newIndex = Math.floor(ratio * totalSegments);
    }
    if (newIndex !== hoveredColorIndex) {
      setHoveredColorIndex(newIndex);
    }
  };

  // Обработчик клика на звезду (избранное)
  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);

    // Обновляем localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (newIsFavorite) {
      // Добавляем в избранное
      if (!favorites.includes(product.id)) {
        favorites.push(product.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } else {
      // Удаляем из избранного
      const newFavorites = favorites.filter((id: number) => id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    window.dispatchEvent(new Event('favoritesChanged'));
  };

  return (
    <div
      className={`relative bg-white shadow-sm overflow-hidden group flex-shrink-0 h-full ${isTablet ? "basis-[calc(100%_/_3)]" : "basis-[calc(100%_/_4)]"
        }`}
    >
      {/* Бейдж скидки */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-20 bg-[#cd5554] text-white text-xs font-bold px-2.5 py-0.75 rounded-xl">
          Сегодня -{(currentDiscount && currentDiscount > 0) ? currentDiscount : product.discount}%
        </div>
      )}
      
      {/* Бейдж ХИТ */}
      {product.hit && (
        <div className={`absolute left-2 z-20 bg-gray-600 text-white text-xs font-bold px-2.5 py-0.75 rounded-xl ${
          hasDiscount ? 'top-12' : 'top-2'
        }`}>
          ХИТ
        </div>
      )}
      
      {/* Звезда (избранное) */}
      <div
        className={`absolute top-2 right-2 z-10 text-2xl hover:text-[#2c3a54] transition cursor-pointer ${isFavorite ? "text-[#2c3a54]" : "text-gray-400"
          }`}
        onClick={toggleFavorite}
      >
        ★
      </div>
      {/* Изображение товара */}
      <div
        className="relative w-full h-64 overflow-hidden cursor-pointer"
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredColorIndex(0);
          setShowIndicators(false);
        }}
        onTouchStart={handleTouchStartImage}
      >
        <Link href={generateProductHref(product)}>
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        </Link>
        {/* Индикаторы цветов для десктопа */}
        {!isTablet && hasColors && (
          <div
            className={`absolute bottom-3 left-[10%] right-[10%] flex space-x-0.5 transition-all duration-300 z-10 ${showIndicators ? "opacity-100" : "opacity-0"
              }`}
          >
            {expandedColors.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-1 rounded-full transition-all duration-300 flex-1 ${index === hoveredColorIndex
                  ? "opacity-100 bg-[#2c3a54]"
                  : "opacity-0 bg-transparent"
                  }`}
              />
            ))}
          </div>
        )}
        {isTablet && hasColors && expandedColors.length > 1 && (
          <div className="absolute bottom-0 right-3 flex flex-col items-end z-10">
            <div className="bg-gray-300 h-2 rounded-full px-1.5 flex space-x-1 justify-end">
              {expandedColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-[5px] h-[5px] rounded-full self-center bg-white transition-all duration-200 ${index === selectedColorIndex
                    ? "ring-1 ring-[#2c3a54]"
                    : "opacity-70"
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Нижняя часть карточки */}
      <div className="p-3 flex flex-col h-[calc(100%-256px)]">
        {/* Title */}
        <h3
          className={`font-bold text-gray-800 mb-1 ${isTablet ? "text-base" : "text-lg"
            }`}
        >
          {product.name}
        </h3>
        {/* Высота */}
        {product.height ? (
          <p className={`text-sm text-gray-600 ${isTablet ? "mb-4" : "mb-3"}`}>
            Общая высота: {product.height}
          </p>
        ) : null}
        {/* Блок с ценой и кнопкой: flex-row на десктопе (цена слева, кнопка справа), на мобиле - col */}
        <div className="flex-1 flex flex-col xl:flex-row justify-between">
          {/* Цены в одну строку */}
          <div
            className={`flex items-center xl:self-end xl:flex-col xl:items-start ${isNarrowMobile ? "flex-col gap-0 items-start" : "gap-2"
              }`}
          >
            {/* Показываем цену с учетом специальных случаев */}
            {shouldUseSpecialPrice ? (
              <span className="text-xl font-bold text-[#2c3a54]">
                {specialPrice}
              </span>
            ) : product.textPrice ? (
              <span className="text-xl font-bold text-[#2c3a54]">
                {product.textPrice}
              </span>
            ) : currentPrice !== undefined && currentPrice !== null ? (
              hasDiscount && currentOldPrice && currentOldPrice !== null ? (
                <>
                  <span className="font-bold text-xl text-[#cd5554]">
                    {product.category === 'Составные' ? 'от ' : ''}{currentPrice} руб.
                  </span>
                  <span className="text-[12px] text-gray-500 line-through">
                    {currentOldPrice} руб.
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#2c3a54]">
                  {product.category === 'Составные' ? 'от ' : ''}{currentPrice} руб.
                </span>
              )
            ) : null}
          </div>

          {/* Кнопка "Подробнее" — только если tablet, но не mobile */}
          {!isMobile && (
            <Link href={generateProductHref(product)}
              className="w-max xl:self-end mt-2 py-[9px] px-[15px] bg-white border border-[#2c3a54] text-[#2c3a54] rounded-full font-bold hover:bg-[#2c3a54] hover:text-white transition whitespace-nowrap text-center"
            >
              Подробнее
            </Link>
          )}
          {/* На мобильном (isMobile) кнопка не отображается */}
        </div>
      </div>
    </div >
  );
};

export default ProductCard;
