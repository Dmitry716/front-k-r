"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { generateSlug } from "@/lib/slug-generator";

interface Product {
  id: number;
  slug: string;
  name: string;
  height?: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  category: string;
  image: string;
  colors?: string;
  options?: string;
  description?: string;
  hit: boolean;
  popular: boolean;
  createdAt: string;
}

interface MonumentCategory {
  key: string;
  title: string;
  description: string;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    category: "",
    image: "",
    options: "",
    height: "",
    description: "",
    characteristics: [] as Array<{key: string, value: string}>,
  });

  // Категории памятников
  const monumentCategories: MonumentCategory[] = [
    { key: "single", title: "Одиночные памятники", description: "Памятники для одного человека" },
    { key: "double", title: "Двойные памятники", description: "Памятники для двух человек" },
    { key: "cheap", title: "Недорогие памятники", description: "Доступные варианты памятников" },
    { key: "cross", title: "Памятники в виде креста", description: "Памятники крестообразной формы" },
    { key: "heart", title: "Памятники в виде сердца", description: "Памятники сердцевидной формы" },
    { key: "composite", title: "Составные памятники", description: "Многокомпонентные памятники" },
    { key: "europe", title: "Европейские памятники", description: "Памятники в европейском стиле" },
    { key: "artistic", title: "Художественная резка", description: "Памятники с художественной резьбой" },
    { key: "tree", title: "Памятники в виде деревьев", description: "Памятники древовидной формы" },
    { key: "complex", title: "Мемориальные комплексы", description: "Комплексные мемориальные сооружения" },
    { key: "exclusive", title: "Эксклюзивные памятники", description: "Эксклюзивные и премиальные памятники" },
  ];

  // Загрузка доступных изображений
  const loadAvailableImages = async () => {
    try {
      const data = await apiClient.get("/admin/images?folder=monuments");
      if (data.success) {
        setAvailableImages(data.data || []);
      } else {
        // Fallback к предустановленному списку
        const fallbackImages = [
          'https://api.k-r.by/api/static/monuments/default1.jpg',
          'https://api.k-r.by/api/static/monuments/default2.jpg',
          'https://api.k-r.by/api/static/monuments/default3.jpg'
        ];
        setAvailableImages(fallbackImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      setAvailableImages([]);
    }
  };

  const fetchProducts = async (category: string) => {
    if (!category) return;
    
    try {
      setLoading(true);
      const data = await apiClient.get(`/admin/monuments?category=${category}`);
      
      if (data.success) {
        setProducts(data.products || []);
        setError("");
      } else {
        setError(data.error || "Ошибка при загрузке памятников");
        setProducts([]);
      }
    } catch (error) {
      setError("Ошибка при загрузке памятников");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateProductStatus = async (id: number, hit?: boolean, popular?: boolean) => {
    if (!selectedCategory) {
      setError("Выберите категорию");
      return;
    }
    
    try {
      setLoading(true);
      const data = await apiClient.post("/admin/monuments", {
          action: "update_status",
          id,
          hit,
          popular,
          category: selectedCategory,
        });
      if (data.success) {
        setSuccess("✓ Статус памятника обновлен");
        await fetchProducts(selectedCategory);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Ошибка при обновлении статуса");
      }
    } catch (error) {
      setError("Ошибка при обновлении статуса");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setProducts([]);
    setError("");
    setSuccess("");
    setEditingProduct(null);
    if (category) {
      fetchProducts(category);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    
    // Парсим options для извлечения характеристик
    let characteristics: Array<{key: string, value: string}> = [];
    if (product.options) {
      try {
        const parsedOptions = typeof product.options === 'string' ? JSON.parse(product.options) : product.options;
        characteristics = Object.entries(parsedOptions).map(([key, value]) => ({
          key,
          value: String(value)
        }));
      } catch (e) {
        console.warn('Failed to parse options for characteristics:', product.options);
      }
    }
    
    setEditForm({
      name: product.name,
      price: product.price?.toString() || "",
      oldPrice: product.oldPrice?.toString() || "",
      discount: product.discount?.toString() || "",
      category: product.category,
      image: product.image,
      options: product.options || "",
      height: product.height || "",
      description: product.description || "",
      characteristics,
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setAddingProduct(false);
    setEditForm({
      name: "",
      price: "",
      oldPrice: "",
      discount: "",
      category: "",
      image: "",
      options: "",
      height: "",
      description: "",
      characteristics: [],
    });
  };

  const startAdding = () => {
    setAddingProduct(true);
    setEditingProduct(null);
    setEditForm({
      name: "",
      price: "",
      oldPrice: "",
      discount: "",
      category: selectedCategory,
      image: "",
      options: "",
      height: "",
      description: "",
      characteristics: [],
    });
  };

  // Функции для автоматического расчета цен и скидок
  const handlePriceChange = (price: string) => {
    const newPrice = parseFloat(price) || 0;
    const oldPrice = parseFloat(editForm.oldPrice) || 0;
    
    setEditForm(prev => {
      const updatedForm = { ...prev, price };
      
      // Если есть старая цена, рассчитываем скидку
      if (oldPrice > 0 && newPrice > 0 && oldPrice > newPrice) {
        updatedForm.discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100).toString();
      } else if (oldPrice > 0 && newPrice >= oldPrice) {
        updatedForm.discount = "0";
      }
      
      return updatedForm;
    });
  };

  const handleOldPriceChange = (oldPrice: string) => {
    const newOldPrice = parseFloat(oldPrice) || 0;
    const currentPrice = parseFloat(editForm.price) || 0;
    
    setEditForm(prev => {
      const updatedForm = { ...prev, oldPrice };
      
      // Если есть текущая цена, рассчитываем скидку
      if (currentPrice > 0 && newOldPrice > 0 && newOldPrice > currentPrice) {
        updatedForm.discount = Math.round(((newOldPrice - currentPrice) / newOldPrice) * 100).toString();
      } else if (currentPrice > 0 && newOldPrice <= currentPrice) {
        updatedForm.discount = "0";
      }
      
      return updatedForm;
    });
  };

  const handleDiscountChange = (discount: string) => {
    const newDiscount = parseFloat(discount) || 0;
    const currentPrice = parseFloat(editForm.price) || 0;
    
    setEditForm(prev => {
      const updatedForm = { ...prev, discount };
      
      // Если есть текущая цена и скидка, рассчитываем старую цену
      if (currentPrice > 0 && newDiscount > 0 && newDiscount < 100) {
        const calculatedOldPrice = Math.round((currentPrice * 100) / (100 - newDiscount));
        updatedForm.oldPrice = calculatedOldPrice.toString();
      } else if (newDiscount <= 0) {
        updatedForm.oldPrice = "";
      }
      
      return updatedForm;
    });
  };

  const saveProduct = async () => {
    if (!selectedCategory) return;

    try {
      setLoading(true);
      // Генерируем JSON options из characteristics массива
      let optionsJson = "";
      if (editForm.characteristics && editForm.characteristics.length > 0) {
        const optionsObj: { [key: string]: string } = {};
        editForm.characteristics.forEach(char => {
          if (char.key && char.value) {
            optionsObj[char.key] = char.value;
          }
        });
        optionsJson = JSON.stringify(optionsObj);
      }

      if (editingProduct) {
        // Обновление существующего памятника
        const currentPrice = editForm.price ? parseFloat(editForm.price) : null;
        const oldPrice = editForm.oldPrice ? parseFloat(editForm.oldPrice) : null;
        const discount = editForm.discount ? parseFloat(editForm.discount) : null;

        const data = await apiClient.put(`/monuments/id/${editingProduct.id}`, {
          name: editForm.name,
          price: currentPrice,
          oldPrice: oldPrice,
          discount: discount,
          category: editForm.category || selectedCategory,
          image: editForm.image || "",
          options: optionsJson,
          height: editForm.height || "",
          description: editForm.description || "",
        });
        if (data.success) {
          setSuccess("✓ Памятник успешно обновлен");
          await fetchProducts(selectedCategory);
          cancelEditing();
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError(data.error || "Ошибка при обновлении памятника");
        }
      } else {
        // Добавление нового памятника
        const currentPrice = editForm.price ? parseFloat(editForm.price) : null;
        const oldPrice = editForm.oldPrice ? parseFloat(editForm.oldPrice) : null;
        const discount = editForm.discount ? parseFloat(editForm.discount) : null;

        // Используем правильный endpoint /monuments с данными напрямую
        const data = await apiClient.post("/monuments", {
          name: editForm.name,
          slug: generateSlug(editForm.name),
          price: currentPrice,
          oldPrice: oldPrice,
          discount: discount,
          category: editForm.category || selectedCategory,
          image: editForm.image || "",
          options: optionsJson,
          height: editForm.height || "",
          description: editForm.description || "",
          hit: false,
          popular: false,
        });
        
        if (data.success) {
          setSuccess("✓ Памятник успешно добавлен");
          await fetchProducts(selectedCategory);
          cancelEditing();
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError(data.error || "Ошибка при добавлении памятника");
        }
      }
    } catch (error) {
      setError("Ошибка при сохранении памятника");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!selectedCategory) return;

    // Подтверждение удаления
    if (!window.confirm('Вы уверены, что хотите удалить этот памятник? Это действие нельзя отменить.')) {
      return;
    }

    try {
      setLoading(true);
      
      // Используем правильный endpoint DELETE /api/monuments/id/:id с категорией
      const response = await fetch(`https://api.k-r.by/api/monuments/id/${id}?category=${selectedCategory}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess("✓ Памятник успешно удален");
        await fetchProducts(selectedCategory);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Ошибка при удалении памятника");
      }
    } catch (error) {
      setError("Ошибка при удалении памятника");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "monuments");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.k-r.by/api'}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setEditForm({ ...editForm, image: data.data.path });
        setSuccess("✓ Изображение успешно загружено");
        await loadAvailableImages(); // Обновляем список доступных изображений
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setUploadError(data.error || "Ошибка загрузки");
      }
    } catch (err: any) {
      setUploadError("Ошибка: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = ""; // Очищаем input
    }
  };

  useEffect(() => {
    // Автоматически выбираем первую категорию при загрузке
    if (monumentCategories.length > 0 && !selectedCategory) {
      handleCategoryChange(monumentCategories[0].key);
    }
    // Загружаем доступные изображения
    loadAvailableImages();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-black">
        <h2 className="text-2xl font-bold mb-4">Управление памятниками</h2>
        
        {/* Выбор категории */}
        <div className="bg-gray-50 p-6 rounded mb-6">
          <h3 className="text-lg font-semibold mb-4">Выберите категорию памятников</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {monumentCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`p-4 rounded border text-left transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="font-medium">{category.title}</div>
                <div className={`text-sm mt-1 ${
                  selectedCategory === category.key ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {category.description}
                </div>
              </button>
            ))}
          </div>
          
          {selectedCategory && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <span className="text-blue-800 font-medium">
                Выбранная категория: {monumentCategories.find(c => c.key === selectedCategory)?.title}
              </span>
            </div>
          )}
        </div>

        {/* Сообщения */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Статистика - показывается только когда выбрана категория */}
        {selectedCategory && (
          <div className="bg-gray-50 p-6 rounded mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Статистика - {monumentCategories.find(c => c.key === selectedCategory)?.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                <div className="text-sm text-gray-600">Всего памятников</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-red-600">{products.filter(p => p.hit).length}</div>
                <div className="text-sm text-gray-600">Хиты продаж</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-green-600">{products.filter(p => p.popular).length}</div>
                <div className="text-sm text-gray-600">Популярные</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-yellow-600">{products.filter(p => p.hit && p.popular).length}</div>
                <div className="text-sm text-gray-600">Хит + Популярный</div>
              </div>
            </div>
          </div>
        )}

        {/* Список памятников */}
        {selectedCategory && (
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Список памятников - {monumentCategories.find(c => c.key === selectedCategory)?.title}
              </h3>
              <button
                onClick={startAdding}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                ➕ Добавить памятник
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-600">Загрузка памятников...</div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-gray-600">Памятники в данной категории не найдены</p>
            ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white border p-4 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={product.image.startsWith('http') ? product.image : `https://api.k-r.by${product.image}`} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{product.name}</h4>
                        <p className="text-sm text-gray-600">Slug: {product.slug}</p>
                        <p className="text-sm text-gray-600">Категория: {selectedCategory}</p>
                        {product.price && (
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-green-600">Цена: {product.price}₽</p>
                            {product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price) && (
                              <>
                                <span className="text-sm text-gray-500 line-through">{product.oldPrice}₽</span>
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                                  -{Math.round(((parseFloat(product.oldPrice) - parseFloat(product.price)) / parseFloat(product.oldPrice)) * 100)}%
                                </span>
                              </>
                            )}
                          </div>
                        )}
                        {product.height && (
                          <p className="text-sm text-gray-600">Высота: {product.height}</p>
                        )}
                        {product.discount && parseFloat(product.discount) > 0 && (
                          <p className="text-sm text-green-600">Скидка: {product.discount}%</p>
                        )}
                        {product.description && (
                          <p className="text-sm text-gray-600">{product.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Статус HIT */}
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.hit}
                            onChange={(e) => updateProductStatus(product.id, e.target.checked, undefined)}
                            disabled={loading}
                            className="w-4 h-4"
                          />
                          <span className={`text-sm font-medium ${product.hit ? 'text-red-600' : 'text-gray-600'}`}>
                            🔥 ХИТ
                          </span>
                        </label>
                      </div>
                      
                      {/* Статус ПОПУЛЯРНЫЙ */}
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.popular}
                            onChange={(e) => updateProductStatus(product.id, undefined, e.target.checked)}
                            disabled={loading}
                            className="w-4 h-4"
                          />
                          <span className={`text-sm font-medium ${product.popular ? 'text-green-600' : 'text-gray-600'}`}>
                            ⭐ ПОПУЛЯРНЫЙ
                          </span>
                        </label>
                      </div>
                      
                      {/* Кнопка редактирования */}
                      <button
                        onClick={() => startEditing(product)}
                        disabled={loading}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                      >
                        ✏️ Редактировать
                      </button>
                      
                      {/* Кнопка удаления */}
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={loading}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        title="Удалить памятник"
                      >
                        🗑️ Удалить
                      </button>
                      
                      {/* Превью ссылка */}
                      <a
                        href={`/monuments/${selectedCategory}/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        👁️ Просмотр
                      </a>
                    </div>
                  </div>
                  
                  {/* Бейджи статуса */}
                  <div className="mt-3 flex space-x-2">
                    {product.hit && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        🔥 ХИТ ПРОДАЖ
                      </span>
                    )}
                    {product.popular && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        ⭐ ПОПУЛЯРНЫЙ
                      </span>
                    )}
                    {!product.hit && !product.popular && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        Обычный товар
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Модальное окно для редактирования/добавления */}
        {(editingProduct || addingProduct) && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingProduct ? "Редактировать памятник" : "Добавить памятник"}
                </h3>
                
                <div className="space-y-4">
                  {/* Название */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Цена */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Цена (руб.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Старая цена (руб.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.oldPrice}
                        onChange={(e) => handleOldPriceChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Скидка */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Скидка (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={editForm.discount}
                      onChange={(e) => handleDiscountChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Введите процент скидки"
                    />
                    {editForm.discount && parseFloat(editForm.discount) > 0 && (
                      <div className="mt-1 text-xs text-green-600">
                        ✓ Старая цена рассчитывается автоматически: {editForm.oldPrice} руб.
                      </div>
                    )}
                    {!editForm.discount && editForm.price && editForm.oldPrice && parseFloat(editForm.oldPrice) > parseFloat(editForm.price) && (
                      <div className="mt-1 text-xs text-blue-600">
                        ℹ️ Автоматическая скидка: -{Math.round(((parseFloat(editForm.oldPrice) - parseFloat(editForm.price)) / parseFloat(editForm.oldPrice)) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Категория */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Категория
                    </label>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Характеристики */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Высота
                      </label>
                      <input
                        type="text"
                        value={editForm.height}
                        onChange={(e) => setEditForm(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="например: 120 см"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Описание
                      </label>
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Краткое описание памятника"
                      />
                    </div>
                  </div>

                  {/* Изображение */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Изображение
                    </label>
                    
                    <div className="space-y-3">
                      {/* Выбор из списка доступных изображений */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Выберите из доступных изображений:
                        </label>
                        <select
                          value={editForm.image}
                          onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Выберите изображение</option>
                          {availableImages.map(img => (
                            <option key={img} value={img}>
                              {img.split('/').pop() || img}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* URL input */}
                      <div className="border-t pt-3">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Или введите URL изображения:
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={editForm.image}
                          onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      {/* Загрузка файла */}
                      <div className="border-t pt-3">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Или загрузите новое изображение:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept=".webp,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {uploading && <span className="text-blue-600 flex items-center">Загрузка...</span>}
                        </div>
                        {uploadError && <p className="text-red-600 text-sm mt-1">{uploadError}</p>}
                      </div>
                    </div>
                    
                    {/* Превью */}
                    {editForm.image && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Превью:</p>
                          <button
                            type="button"
                            onClick={() => setEditForm(prev => ({ ...prev, image: "" }))}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Очистить
                          </button>
                        </div>
                        <img 
                          src={(() => {
                            if (!editForm.image) return '';
                            if (editForm.image.startsWith('http')) return editForm.image;
                            if (editForm.image.startsWith('/')) return `https://api.k-r.by${editForm.image}`;
                            return `https://api.k-r.by/api/static/monuments/${editForm.image}`;
                          })()} 
                          alt="Превью" 
                          className="w-32 h-32 object-cover rounded border"
                          onError={(e) => {
                            console.error('Image load error:', editForm.image);
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgMTI4IDk2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg4OFY1Nkg0MFY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KUGF0aCBkPSJNNDggNDhIODBWNTZINDhWNDhaIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSI2NCIgeT0iNzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+0J7RiNC40LHQutCwINC30LDQs9GA0YPQt9C60Lg8L3RleHQ+Cjwvc3ZnPg==';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Характеристики */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Характеристики
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setEditForm(prev => ({
                            ...prev,
                            characteristics: [...prev.characteristics, { key: "", value: "" }]
                          }));
                        }}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        + Добавить
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {editForm.characteristics.map((char, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Название характеристики"
                            value={char.key}
                            onChange={(e) => {
                              setEditForm(prev => {
                                const newChars = [...prev.characteristics];
                                newChars[index] = { ...newChars[index], key: e.target.value };
                                return { ...prev, characteristics: newChars };
                              });
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Значение"
                            value={char.value}
                            onChange={(e) => {
                              setEditForm(prev => {
                                const newChars = [...prev.characteristics];
                                newChars[index] = { ...newChars[index], value: e.target.value };
                                return { ...prev, characteristics: newChars };
                              });
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditForm(prev => ({
                                ...prev,
                                characteristics: prev.characteristics.filter((_, i) => i !== index)
                              }));
                            }}
                            className="px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      {editForm.characteristics.length === 0 && (
                        <p className="text-gray-500 text-sm italic">
                          Нет характеристик. Нажмите "Добавить" чтобы создать новую.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    onClick={cancelEditing}
                    disabled={loading}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveProduct}
                    disabled={loading || !editForm.name.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Сохранение..." : "Сохранить"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}