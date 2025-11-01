"use client";

import { useState, FormEvent, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface Epitaph {
  id: number;
  text: string;
  createdAt: string;
}

export default function AdminEpitaphsPage() {
  const [text, setText] = useState("");
  const [epitaphs, setEpitaphs] = useState<Epitaph[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Загрузить эпитафии
  useEffect(() => {
    fetchEpitaphs();
  }, []);

  async function fetchEpitaphs() {
    try {
      const data = await apiClient.get("/epitaphs");
      setEpitaphs(data.data || []);
    } catch (err) {
      console.error("Failed to fetch epitaphs:", err);
    }
  }

  // Создать новую эпитафию
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const data = await apiClient.post("/epitaphs", { text });
      
      if (!data.success) {
        throw new Error(data.error || "Failed to create epitaph");
      }

      setText("");
      setSuccess(true);
      await fetchEpitaphs();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Удалить эпитафию
  async function handleDelete(id: number) {
    if (!confirm("Вы уверены, что хотите удалить эпитафию?")) return;

    try {
      const data = await apiClient.delete(`/epitaphs/${id}`);
      
      if (!data.success) {
        throw new Error("Failed to delete epitaph");
      }

      await fetchEpitaphs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  // Сохранить редакцию
  async function handleSaveEdit(id: number) {
    if (!editText.trim()) return;

    try {
      const data = await apiClient.put(`/epitaphs/${id}`, { text: editText });
      
      if (!data.success) {
        throw new Error("Failed to update epitaph");
      }

      setEditingId(null);
      setEditText("");
      await fetchEpitaphs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Управление эпитафиями
        </h1>
        <p className="text-gray-600 mb-8">
          Создавайте, редактируйте и удаляйте тексты эпитафий для памятников
        </p>
      </div>

        {/* Форма создания */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Добавить новую эпитафию
          </h2>

          <div className="mb-6">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Текст эпитафии
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст эпитафии..."
              rows={4}
              className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Эпитафия успешно добавлена!
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Загрузка..." : "Добавить эпитафию"}
          </button>
        </form>

        {/* Список эпитафий */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Все эпитафии ({epitaphs.length})
            </h2>
          </div>

          {epitaphs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Нет эпитафий. Создайте первую!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {epitaphs.map((epitaph) => (
                <div key={epitaph.id} className="p-6 hover:bg-gray-50">
                  {editingId === epitaph.id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(epitaph.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-700 italic leading-relaxed">
                        {epitaph.text}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            setEditingId(epitaph.id);
                            setEditText(epitaph.text);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(epitaph.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}
