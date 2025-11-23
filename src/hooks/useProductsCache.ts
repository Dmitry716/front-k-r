'use client';
import { useState, useEffect } from 'react';
import { Product } from '../app/types/types';

// In-memory cache для продуктов
const productsCache: { [key: string]: { data: Product[]; timestamp: number } } = {};
// Promise cache для дедупликации параллельных запросов
const pendingRequests: { [key: string]: Promise<Product[]> } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Функция для загрузки данных с дедупликацией
async function fetchWithDedup(endpoint: string): Promise<Product[]> {
  const now = Date.now();

  // Проверяем кеш
  const cached = productsCache[endpoint];
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Если запрос уже идёт, ждём его
  if (endpoint in pendingRequests) {
    return pendingRequests[endpoint];
  }

  // Создаём новый запрос
  const promise = (async () => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        const fetchedProducts = data.data || [];
        
        // Сохраняем в кеш
        productsCache[endpoint] = {
          data: fetchedProducts,
          timestamp: Date.now(),
        };
        
        return fetchedProducts;
      }
      return [];
    } catch (error) {
      console.warn(`Error fetching from ${endpoint}:`, error);
      return [];
    } finally {
      // Удаляем promise из pending после завершения
      delete pendingRequests[endpoint];
    }
  })();

  // Сохраняем promise в pending
  pendingRequests[endpoint] = promise;
  return promise;
}

export function useProductsCache(endpoints: string[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // Загружаем все endpoints параллельно с дедупликацией
        const results = await Promise.all(
          endpoints.map(endpoint => fetchWithDedup(endpoint))
        );
        
        // Объединяем результаты
        const allProducts = results.flat();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoints.join(',')]);

  return { products, loading };
}
