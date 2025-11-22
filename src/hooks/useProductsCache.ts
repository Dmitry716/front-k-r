'use client';
import { useState, useEffect } from 'react';
import { Product } from '../app/types/types';

// In-memory cache для продуктов
const productsCache: { [key: string]: { data: Product[]; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export function useProductsCache(endpoints: string[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let allProducts: Product[] = [];
      const now = Date.now();

      for (const endpoint of endpoints) {
        // Проверяем кеш
        const cached = productsCache[endpoint];
        if (cached && now - cached.timestamp < CACHE_DURATION) {
          allProducts = [...allProducts, ...cached.data];
          continue;
        }

        // Загружаем из API
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            const fetchedProducts = data.data || [];
            
            // Сохраняем в кеш
            productsCache[endpoint] = {
              data: fetchedProducts,
              timestamp: now,
            };
            
            allProducts = [...allProducts, ...fetchedProducts];
          }
        } catch (error) {
          console.warn(`Error fetching from ${endpoint}:`, error);
        }
      }

      setProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [endpoints.join(',')]);

  return { products, loading };
}
