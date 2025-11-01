"use client";

import { useState } from "react";

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
    initialPage?: number;
}

const Pagination = ({ totalPages, onPageChange, initialPage = 1 }: PaginationProps) => {
    const [activePage, setActivePage] = useState(initialPage);

    if (totalPages <= 1) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setActivePage(page);
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center space-x-2 mt-8 font-[600]">
            {/* Кнопка "Предыдущая" */}
            <button
                onClick={() => handlePageChange(activePage - 1)}
                hidden={activePage <= 1}
                className="px-4 py-1 rounded-full hover:bg-[#2c3a54] hover:text-white text-[#2c3a54] border border-[#2c3a54] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Предыдущая
            </button>

            {/* Кнопки номеров страниц */}
            {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-full text-[#2c3a54] border border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white flex items-center justify-center ${activePage === pageNum ? "border-0" : ""
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            {/* Кнопка "Следующая" */}
            <button
                onClick={() => handlePageChange(activePage + 1)}
                hidden={activePage >= totalPages}
                className="px-4 py-1 rounded-full hover:bg-[#2c3a54] hover:text-white text-[#2c3a54] border border-[#2c3a54] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Следующая
            </button>
        </div>
    );
};

export default Pagination;