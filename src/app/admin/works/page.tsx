"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface Work {
  id: number;
  title: string;
  description?: string;
  image: string;
  productId?: string;
  productType: "monuments" | "fences";
  category?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
}

const WorksAdmin = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  // Форма
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    productId: "",
    productType: "monuments" as "monuments" | "fences",
    category: "",
  });

  // Категории для каждого типа продукта (только памятники и ограды)
  const categoryOptions = {
    monuments: [
      "Одиночные",
      "Двойные", 
      "Эксклюзивные",
      "Недорогие",
      "В виде креста",
      "В виде сердца",
      "Составные",
      "Европейские",
      "Художественная резка",
      "В виде деревьев",
      "Мемориальные комплексы",
    ],
    fences: [
      "Гранитные ограды",
      "С полимерным покрытием",
      "Металлические ограды"
    ]
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    loadWorks();
    loadProducts();
    loadAvailableImages();
  }, []);

  // Загрузка работ
  const loadWorks = async () => {
    try {
      const data = await apiClient.get('/admin/works?limit=200');
      if (data.success) {
        setWorks(data.works || []);
      }
    } catch (error) {
      console.error('Error loading works:', error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка продуктов для привязки (только памятники и ограды)
  const loadProducts = async () => {
    try {
      // Загружаем только памятники и ограды
      const [monuments, fences] = await Promise.all([
        apiClient.get('/admin/monuments?limit=500'),
        apiClient.get('/admin/fences?limit=200'),
      ]);

      const allProducts: Product[] = [];

      // Памятники
      if (monuments.success) {
        monuments.monuments.forEach((p: any) => {
          allProducts.push({
            id: p.id,
            slug: p.slug,
            name: p.name,
            category: `Памятники / ${p.category}`,
          });
        });
      }

      // Ограды
      if (fences.success) {
        fences.products.forEach((p: any) => {
          allProducts.push({
            id: p.id,
            slug: p.slug,
            name: p.name,
            category: `Ограды / ${p.category}`,
          });
        });
      }

      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Загрузка доступных изображений из /public/works
  const loadAvailableImages = async () => {
    try {
      const data = await apiClient.get("/admin/images?folder=works");
      if (data.success) {
        setAvailableImages(data.data || []);
      } else {
        // Fallback к предустановленному списку с правильными путями
        const predefinedImages = [
          'https://api.k-r.by/api/static/works/1.webp',
          'https://api.k-r.by/api/static/works/2.webp',
          'https://api.k-r.by/api/static/works/3.webp',
          'https://api.k-r.by/api/static/works/4.webp',
          'https://api.k-r.by/api/static/works/5.webp',
          'https://api.k-r.by/api/static/works/6.webp',
          'https://api.k-r.by/api/static/works/7.webp',
          'https://api.k-r.by/api/static/works/8.webp',
          'https://api.k-r.by/api/static/works/9.webp',
          'https://api.k-r.by/api/static/works/10.webp',
        ];
        setAvailableImages(predefinedImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      // Fallback к предустановленному списку при ошибке с правильными путями
      const predefinedImages = [
        'https://api.k-r.by/api/static/works/1.webp',
        'https://api.k-r.by/api/static/works/2.webp',
        'https://api.k-r.by/api/static/works/3.webp',
        'https://api.k-r.by/api/static/works/4.webp',
        'https://api.k-r.by/api/static/works/5.webp',
        'https://api.k-r.by/api/static/works/6.webp',
        'https://api.k-r.by/api/static/works/7.webp',
        'https://api.k-r.by/api/static/works/8.webp',
        'https://api.k-r.by/api/static/works/9.webp',
        'https://api.k-r.by/api/static/works/10.webp',
      ];
      setAvailableImages(predefinedImages);
    }
  };

  // Сохранение работы
  const handleSave = async () => {
    try {
      let data;
      if (editingWork) {
        data = await apiClient.put(`/admin/works/${editingWork.id}`, formData);
      } else {
        data = await apiClient.post('/admin/works', formData);
      }

      if (data.success) {
        loadWorks();
        resetForm();
      } else {
        alert('Ошибка сохранения: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving work:', error);
      alert('Ошибка сохранения');
    }
  };

  // Удаление работы
  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту работу?')) return;

    try {
      const data = await apiClient.delete(`/admin/works/${id}`);
      if (data.success) {
        loadWorks();
      } else {
        alert('Ошибка удаления: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting work:', error);
      alert('Ошибка удаления');
    }
  };

  // Редактирование работы
  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      description: work.description || "",
      image: work.image,
      productId: work.productId || "",
      productType: work.productType,
      category: work.category || "",
    });
    setShowForm(true);
  };

  // Сброс формы
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      productId: "",
      productType: "monuments",
      category: "",
    });
    setEditingWork(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Загрузка...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Управление готовыми работами</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить работу
        </button>
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6 text-black">
          <h2 className="text-xl font-semibold mb-4">
            {editingWork ? 'Редактировать работу' : 'Добавить работу'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Название</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Категория</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Выберите категорию</option>
                {categoryOptions[formData.productType].map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Тип продукта</label>
              <select
                value={formData.productType}
                onChange={(e) => {
                  setFormData({
                    ...formData, 
                    productType: e.target.value as "monuments" | "fences",
                    productId: "", // сброс выбора продукта при смене типа
                    category: "" // сброс категории при смене типа
                  });
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="monuments">Памятники</option>
                <option value="fences">Ограды</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Привязанный товар</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({...formData, productId: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Не привязано</option>
                {products
                  .filter(p => formData.productType === "monuments" ? 
                    p.category.startsWith("Памятники") :
                    p.category.startsWith("Ограды")
                  )
                  .map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.category})
                    </option>
                  ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Изображение</label>
              <select
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              >
                <option value="">Выберите изображение</option>
                {availableImages.map(img => (
                  <option key={img} value={`/works/${img}`}>
                    {img}
                  </option>
                ))}
              </select>
              
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-24 object-cover border rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingWork ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список работ */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Изображение
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Продукт
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата создания
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {works.map((work) => (
                <tr key={work.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{work.title}</div>
                    <div className="text-sm text-gray-500">{work.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {work.category || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {work.productId ? 
                      products.find(p => p.id.toString() === work.productId)?.name || 'Не найден'
                      : '—'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(work.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(work)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {works.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Нет добавленных работ
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksAdmin;