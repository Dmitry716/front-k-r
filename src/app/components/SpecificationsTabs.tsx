"use client";
import React, { useState } from "react";

interface Specifications {
  size?: string;
  secondarySize?: string;
  frameBorder?: string;
  graniteTypes?: string;
  pillar?: string;
  storage?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

interface SpecificationsTabsProps {
  specifications?: Specifications;
  description?: string;
}

const SPEC_LABELS: Record<string, string> = {
  size: "Размер участка",
  secondarySize: "Другой размер",
  frameBorder: "Брус ограды (высота, толщина)",
  graniteTypes: "Другие виды гранита",
  pillar: "Столб",
  storage: "Хранение",
  warranty: "Гарантия",
};

const SpecificationsTabs: React.FC<SpecificationsTabsProps> = ({
  specifications = {},
  description = "",
}) => {
  const [activeTab, setActiveTab] = useState<"characteristics" | "description">(
    "characteristics"
  );

  // Фильтруем только заполненные характеристики
  const filledSpecs = Object.entries(specifications).filter(
    ([, value]) => value && value.trim()
  );

  // Если нет ни характеристик, ни описания, не показываем ничего
  if (filledSpecs.length === 0 && !description) {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-6">
      {/* Табы */}
      <div className="flex border-b mb-6">
        {filledSpecs.length > 0 && (
          <button
            onClick={() => setActiveTab("characteristics")}
            className={`px-4 py-2 font-medium text-lg transition-colors ${
              activeTab === "characteristics"
                ? "text-[#2c3a54] border-b-2 border-[#2c3a54]"
                : "text-gray-600 hover:text-[#2c3a54]"
            }`}
          >
            Характеристики
          </button>
        )}
        {description && (
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-2 font-medium text-lg transition-colors ${
              activeTab === "description"
                ? "text-[#2c3a54] border-b-2 border-[#2c3a54]"
                : "text-gray-600 hover:text-[#2c3a54]"
            }`}
          >
            Описание
          </button>
        )}
      </div>

      {/* Контент табов */}
      {activeTab === "characteristics" && filledSpecs.length > 0 && (
        <div className="space-y-4">
          {filledSpecs.map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
              <span className="text-gray-600 font-medium">
                {SPEC_LABELS[key] || key}
              </span>
              <span className="text-[#2c3a54] font-medium text-right">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "description" && description && (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        </div>
      )}
    </div>
  );
};

export default SpecificationsTabs;
