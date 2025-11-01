"use client";
import { useEffect, useState } from "react";
import PathPage from "@/app/components/PathPage";
import SidebarCatalogMenu from "@/app/components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "@/app/components/Sidebar/SidebarStickyHelp";
import Promo from "@/app/components/Promo";
import Link from "next/link";

const MonumentDismantlePage = () => {
    const [isTablet, setIsTablet] = useState(false);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1024);
            setIsNarrowMobile(width < 420);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <>
            <section className="page-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">

                    <div className="pl-5 lg:pl-0">
                        <PathPage />
                        <h1 className="text-black text-[28px] mt-2.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Демонтаж памятников</h1>
                    </div>

                    {/* Основной контент */}
                    <div className="mt-7.5 font-[600] shadow-xs p-5 lg:p-7.5 rounded-lg">
                        {/* Введение */}
                        <p className="text-[#2c3a54] mb-5">
                            Для подготовки могильного участка к установке памятника нередко требуется демонтаж старых конструкций: старого памятника, ограды, разборка фундамента. В некоторых случаях демонтажные работы занимают больше времени, чем сама установка, требуется специальная техника, кран-манипулятор. Так как старые памятники часто весят более 200 килограмм.
                        </p>

                        {/* Стандартный демонтаж */}
                        <h2 className="text-[#2c3a54] mb-3.75">Стандартный демонтаж включает замену:</h2>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Старой стелы, подставки</li>
                            <li>Цветочницы</li>
                            <li>Удаление старой плитки</li>
                            <li>Металлической или гранитной ограды</li>
                            <li>Разборка старого фундамента</li>
                            <li>Удаление лишних камней после разборки</li>
                            <li>Выравнивание грунта, обсыпка песком (если требуется)</li>
                            <li>Удаление лишней растительности (поросшая трава, сорняки, деревья, кусты)</li>
                            <li>Столиков, лавочек, скамеек</li>
                            <li>Вывоз строительного мусора.</li>
                        </ul>

                        {/* Оценка монумента */}
                        <p className="text-[#2c3a54] mb-5">
                            Оценка монумента на пригодность к реставрации проводится при личном осмотре менеджера либо по фотографии заказчика.
                        </p>

                        {/* Контактная информация */}
                        <h3 className="text-[#2c3a54] mb-2.5">Заказать услугу можно по телефонам:</h3>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>+375 33 677-01-66 МТС</li>
                            <li>+375 29 182-01-66 Велком.</li>
                        </ul>
                        <p className="text-[#2c3a54] mb-5">
                            Для более подробной консультации обращайтесь <strong>по адресу: пр-т Любимова 26 к3.</strong>
                        </p>
                    </div>

                    {/* Блок "Другие категории" */}
                    <div className={`mt-17 lg:mt-30 ${isTablet ? 'container-centered' : ''}`}>
                        <h2 className="text-[28px] font-bold text-[#2c3a54] ml-2.5 mb-3.5 lg:mb-5">Другие категории</h2>
                        {/* Общий блок с flex */}
                        <div className={`flex flex-wrap ${isNarrowMobile ? 'flex-col space-y-2.5' : ''}`}>
                            {/* Карточка "Изготовление памятников" */}
                            <div className={`px-1.25 md:px-2.5 max-w-1/2 flex-1/2 min-h-[60px] lg:min-h-[140px] ${isNarrowMobile ? 'max-w-full' : ''}`}>
                                <a href="/monument-manufacturing" className="block overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full items-center pr-40 p-7.5">
                                    {/* Текст */}
                                    <h2 className="text-[16px] font-bold text-[#222222] self-start">Изготовление памятников</h2>
                                    {/* Изображение с абсолютным позиционированием */}
                                    <img
                                        src="/services/monument-production.webp"
                                        alt="Изготовление памятников"
                                        className="w-[75px] lg:w-[130px] h-auto object-cover rounded-lg absolute top-1/2 right-2.5 transform -translate-y-1/2"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* внизу страницы */}
            <div className="mb-12.5 lg:mb-15">
                <Promo />
            </div>
        </>
    );
};

export default MonumentDismantlePage;