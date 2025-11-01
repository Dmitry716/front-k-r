"use client";
import { useEffect, useState } from "react";
import PathPage from "@/app/components/PathPage";
import SidebarCatalogMenu from "@/app/components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "@/app/components/Sidebar/SidebarStickyHelp";
import Promo from "@/app/components/Promo";
import Link from "next/link";

const InstallationPage = () => {
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
                        <h1 className="text-black text-[28px] mt-2.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Установка памятников</h1>
                    </div>

                    {/* Основной контент */}
                    <div className="mt-7.5 font-[600] shadow-xs p-5 lg:p-7.5 rounded-lg">
                        {/* Введение */}
                        <p className="text-[#2c3a54] mb-5">
                        <strong>Установка памятников на могилу </strong> — самый ответственный этап работ, так как от него зависит внешний вид и надежность всего комплекса.
                        </p>

                        {/* Процедура установки */}
                        <p className="text-[#2c3a54] mb-5">
                            Процедура установки включает в себя следующие основные этапы:
                        </p>
                        <ol className="list-decimal pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Выравнивание участка захоронения</li>
                            <li>Выставление опалубки, прокладка бетонных балок, укладка арматуры</li>
                            <li>Заливка бетонного основания</li>
                            <li>Монтаж стелы, тумбы, цветника</li>
                            <li>Монтаж других элементов надгробия</li>
                            <li>Укладка плитки, обсыпка декоративным щебнем, благоустройство территории.</li>
                        </ol>

                        {/* Методы установки */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Методы установки памятника</h2>

                        {/* Метод 1: По уровню земли */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">1. Установка по уровню земли</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/1.webp" alt="Установка по уровню земли" className="w-full h-auto rounded-lg" />
                        </div>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Этапы работы:</strong>
                        </p>
                        <ol className="list-decimal pl-5 text-[#2c3a54] space-y-1 mb-5">
                            <li>Укладка железобетонных балок вдоль места захоронения. Длина балок — около 270 см.</li>
                            <li>Заливка отмостки, на которую крепится подставка и цветник.</li>
                            <li>Монтаж стелы на подставку. В подставке предварительно просверливаются отверстия для арматуры. Арматура на половину входит в подставку, а вторая половина арматуры входит в стелу. Длина арматуры — около 15 см.</li>
                        </ol>

                        <div className="mb-5">
                            <img src="/services/monuments/2.webp" alt="Установка по уровню земли" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Пример памятника */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mt-10 mb-2.5">Пример памятника, установленного на балки</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/3.webp" alt="Пример памятника, установленного на балки" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Метод 2: На бетонный фундамент */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">2. На бетонный фундамент</h3>
                        <p className="text-[#2c3a54] mb-5">
                            Заливка бетонного фундамента — это надежно и надолго.
                        </p>
                        <div className="mb-5">
                            <img src="/services/monuments/4.webp" alt="Памятник на бетонном фундаменте" className="w-full h-auto rounded-lg" />
                        </div>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Этапы работы:</strong>
                        </p>
                        <ol className="list-decimal pl-5 text-[#2c3a54] space-y-1 mb-5">
                            <li>По периметру места захоронения установщики прокладывают опалубку из дерева.</li>
                            <br />
                            <li>Площадь участка заливают бетоном, предварительно проармировав арматурой 10-12 мм.</li>
                            <em className="text-sm">*Для опалубки используются стандартные отрезные доски толщиной 2-3 см и шириной 25-35 см.</em>
                            <br />
                            <br />
                            <li>Монтаж стелы, тумбы и цветочницы производится после того, как бетонная заливка выстоит необходимое время.</li>
                            <br />
                            <li>Боковые стороны и верхнюю часть фундамента рекомендуется обложить плиткой. Плитка может быть тротуарной, керамогранитной или гранитной. Она придаёт участку законченный внешний вид.</li>
                        </ol>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Памятник на бетонном фундаменте, облицованном плиткой Грес</strong>
                        </p>
                        <div className="mb-5">
                            <img src="/services/monuments/5.webp" alt="Памятник на бетонном фундаменте, облицованном плиткой Грес" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Метод 3: Фундамент из бессерных блоков */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">3. Фундамент из бессерных блоков</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/6.webp" alt="Фундамент из бессерных блоков" className="w-full h-auto rounded-lg" />
                        </div>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Этапы работы:</strong>
                        </p>
                        <ol className="list-decimal pl-5 text-[#2c3a54] space-y-1 mb-5">
                            <li>По периметру участка захоронения прокладывается опалубка. Опалубка уходит в землю на глубину около 15 см.</li>
                            <li>Бессер-блоки монтируются на опалубку. Полости заливаются бетоном, через них в фундамент вставляются куски арматуры для лучшей сцепки бессера с опалубкой.</li>
                            <li>Площадь участка внутри бессер-блоков заливается бетоном.</li>
                            <li>На стяжку, облицованную плиткой, монтируют памятник и ограду.</li>
                        </ol>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Фундамент из бессер-блоков</strong>
                        </p>
                        <div className="mb-10">
                            <img src="/services/monuments/7.webp" alt="Фундамент из бессер-блоков - готовый вид" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Инструменты и материалы */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Какие инструменты используются при установке?</h3>
                        <p className="text-[#2c3a54] ml-10 mb-2.5"><strong>Инструмент:</strong></p>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Обычный и резиновый молоток;</li>
                            <li>Шуруповерт или отвертка;</li>
                            <li>Строительный уровень, угольник;</li>
                            <li>Мастерок и шпатель;</li>
                            <li>Пистолет для герметика, ведро;</li>
                            <li>Штыковая лопата.</li>
                        </ul>
                        <p className="text-[#2c3a54] ml-10 mb-2.5"><strong>Материалы:</strong></p>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Два-три мешка цемента.</li>
                            <li>Песок, вода;</li>
                            <li>Доски для опалубки, гвозди.</li>
                        </ul>
                        <p className="text-[#2c3a54] mb-5">
                            Задействовано минимум два работника. Вес стандартной конструкции может превышать 200 кг.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            Перевозка всех комплектующих проводится с повышенной осторожностью. Все элементы плотно укладываются, между ними прокладывается картон либо пенопласт. Это не допустит повреждения комплектующих изделия.
                        </p>

                        {/* Демонтаж старых памятников */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Демонтаж старых памятников</h2>
                        <div className="mb-5">
                            <img src="/services/monuments/8.webp" alt="Демонтаж старого памятника" className="w-full h-auto rounded-lg" />
                        </div>
                        <p className="text-[#2c3a54] mb-5">
                            Отдельно следует выделить важность подготовки участка. В особых случаях требуется провести демонтаж старой конструкции. Цена установки памятника останется неизменной.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            <strong>Итак, демонтаж включает:</strong> удаление старых элементов надгробия и очистку места захоронения для переустановки нового памятника или реставрации старого.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            Демонтажные работы проводятся до установки нового памятника. Стоимость демонтажа зависит от размеров старого памятника, количества демонтируемых элементов.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            Закажите изготовление и установку памятников в г. Минске по адресу: пр-т Любимова, 26, к.3.
                        </p>
                        <p className="text-[#2c3a54] mb-2.5">
                            Перейти в разделы:
                        </p>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1">
                            <li><Link href={"/"} className="text-[#969ead]">Плитка на могилу</Link></li>
                            <li><Link href={"/"} className="text-[#969ead]">Установка оград</Link></li>
                        </ul>
                    </div>
                    {/* Блок "Другие категории" */}
                    <div className={`mt-17 lg:mt-30 ${isTablet ? 'container-centered' : ''}`}>
                        <h2 className="text-[28px] font-bold text-[#2c3a54] ml-2.5 mb-3.5 lg:mb-5">Другие категории</h2>
                        {/* Общий блок с flex */}
                        <div className={`flex flex-wrap ${isNarrowMobile ? 'flex-col space-y-2.5' : ''}`}>
                            {/* Карточка "Установка оград" */}
                            <div className={`px-1.25 md:px-2.5 max-w-1/2 flex-1/2 min-h-[60px] lg:min-h-[140px] ${isNarrowMobile ? 'max-w-full' : ''}`}>
                                <a href="/fences-installation" className="overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full block items-center pr-40 p-7.5">
                                    {/* Текст */}
                                    <h2 className="text-[16px] font-bold text-[#222222] self-start">Установка оград</h2>
                                    {/* Изображение с абсолютным позиционированием */}
                                    <img
                                        src="/services/fence-installation.webp"
                                        alt="Установка оград"
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

export default InstallationPage;