"use client";
import { useEffect, useState } from "react";
import PathPage from "../components/PathPage";
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp";
import { categoriesDesign } from "../mock/categories";
import Promo from "../components/Promo";


const DesignPage = () => {
    const [isTablet, setIsTablet] = useState(false);

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1024);
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

                    <div className={`${isTablet ? 'container-centered' : ''}`}>
                        <PathPage />
                        <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Услуги гранитной мастерской</h1>

                        {/* Блок категорий */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-7.5">
                            {categoriesDesign.map((category) => (
                                <a
                                    key={category.title}
                                    href={category.link}
                                    className="block overflow-hidden rounded-lg"
                                >
                                    <div className="relative flex h-[80px] lg:h-[120px] py-5 pl-3.75 pr-12.5 lg:pr-25 justify-between bg-[#f5f6fa] rounded-lg hover:border-2 border-[#2c3a54]">
                                        <div className="flex flex-col w-[70%] self-center z-10">
                                            <h2 className="text-[16px] font-bold text-[#222222] mb-2.5">{category.title}</h2>
                                            <p className="text-[12px] text-[#969ead]">{category.price}</p>
                                        </div>
                                        <div className="absolute self-center -right-2 rounded-lg max-w-[130px] overflow-hidden">
                                            <img
                                                src={category.img}
                                                alt={category.title}
                                                className={`h-full object-cover rounded-lg ${isTablet ? 'w-[75px]' : 'w-[130px]'}`}
                                            />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Описание страницы */}
                    <div className="mt-7.5 font-[600] shadow-md p-7.5 rounded-lg">
                        {/* Первый абзац */}
                        <p className=" text-[#2c3a54] mb-5">
                            Художественное оформление памятника — это процесс по нанесению портрета, текста, памятной надписи и креста на памятник. Существует несколько способов нанесения портретов, текстов, ритуальных символов.
                        </p>

                        {/* Вставка первого фото */}
                        <div className="mb-5">
                            <img src="/design/1.webp" alt="Оформление памятников" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Второй абзац */}
                        <p className=" text-[#2c3a54] mb-5">
                            Кроме стандартного наполнения, надгробие можно дополнить пейзажным или тематическим рисунком. Например, обратную сторону стелы можно дополнить гравировкой любимого автомобиля или нанести рисунок по роду деятельности.
                        </p>

                        <p className=" text-[#2c3a54] mb-5">
                            Оформление надгробной плиты хорошо дополнят любой памятник. Чаще всего на надгробные плиты наносят цветы: розы или гвоздики со свечами. Но мы подходим к каждой работе индивидуально, опираясь на вкус и желания заказчика, поэтому изображение на памятнике может быть любым.
                        </p>

                        {/* Вставка второго фото */}
                        <div className="mb-5">
                            <img src="/design/2.webp" alt="Оформление памятников: виды и их особенности" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Заголовок "Оформление памятников: виды и их особенности" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Оформление памятников: виды и их особенности</h2>
                        <p className=" text-[#2c3a54] mb-5">Самый важный этап при оформлении надгробия — нанесение портрета. Портреты можно наносить несколькими способами. Основные их них:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>Гравировка портрета — самый долговечный и доступный вариант оформления памятника по фото. Портрет переносится на поверхность камня с помощью ударно-гравировального станка. Хороший способ сохранить изображение на долгие годы.</li>
                            <li>Медальон — обеспечивает лучшую цветопередачу изображения. Портреты на медальонах получаются более естественными. Этот вариант подойдет тем, кто хочет сохранить натуральные оттенки фотографии.</li>
                        </ul>
                        <p className=" text-[#2c3a54] mb-5">Выбор способа нанесения портрета зависит от предпочтений и бюджета.</p>

                        {/* Вставка третьего фото */}
                        <div className="mb-5">
                            <img src="/design/3.webp" alt="Материалы медальонов" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Заголовок "Материалы медальонов" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Материалы медальонов</h2>
                        <p className=" text-[#2c3a54] mb-5">Медальоны по материалу изготовления бывают:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>Металлическими — самый доступный и бюджетный вариант изделия. Простое и недорогое решение, но может со временем потерять внешний вид.</li>
                            <li>Керамогранитными — оптимальный выбор по соотношению цена-качество. Такие медальоны почти не подвержены выгоранию, а также обеспечивают хорошую цветопередачу.</li>
                            <li>Фарфоровыми — поверхность таких медальонов более гладкая, чем у керамогранитных и цветопередача немного лучше.</li>
                            <li>Триплекс — стеклянные медальоны. Лучшая цветопередача, огромное количество возможностей для улучшения фото: вариантов одежды, фонов и вариантов исполнения. Такие медальоны лучше выбирать для фотографий большого формата.</li>
                        </ul>
                        <p className=" text-[#2c3a54] mb-5">Итак, выбор материала медальона зависит от желаемого качества изображения и условий эксплуатации. Триплекс и фарфор дают лучшую цветопередачу, а керамогранит — оптимален по цене и надежности.</p>

                        {/* Вставка четвертого фото */}
                        <div className="mb-5">
                            <img src="/design/4.webp" alt="Виды нанесения текста на памятник" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Заголовок "Виды нанесения текста на памятник" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Виды нанесения текста на памятник</h2>
                        <p className=" text-[#2c3a54] mb-5">Способы нанесения текста в оформлении памятника:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>Гравировка — технология такая же, как при нанесении портретов. Гравировка текста — самый долговечный вариант, который практически не подвержен временным изменениям.</li>
                            <li>Пескоструйная выбивка — наносится с помощью пескоструйного аппарата. Пескоструйные тексты глубже, чем гравированные, выглядят более рельефно.</li>
                            <li>Накладные буквы — монтируются на поверхность камня с помощью штырей и клея. Это более дорогой и изящный вариант оформления.</li>
                        </ul>
                        <p className=" text-[#2c3a54] mb-5">Каждый способ нанесения текста имеет свои преимущества. Гравировка долговечна, пескоструйный метод придает объем, а накладные буквы выглядят эффектно и статусно.</p>

                        {/* Вставка пятого фото */}
                        <div className="mb-5">
                            <img src="/design/5.webp" alt="Художественное оформление памятников в «Каменная роза»" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Заголовок "Художественное оформление памятников в «Каменная роза»" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Художественное оформление памятников в «Каменная роза»</h2>
                        <p className=" text-[#2c3a54] mb-5">Преимущества услуги оформления памятников из гранита в компании «Каменная роза»:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>Работаем со всеми видами портретов и текстов.</li>
                            <li>Согласовываем портреты перед нанесением на памятник.</li>
                            <li>Согласовываем расположение элементов оформления перед нанесением.</li>
                            <li>Предоставляем каталог рисунков и декоративных элементов для нанесения на надгробие и надгробную плиту.</li>
                            <li>Работаем со всеми видами фурнитуры для памятников.</li>
                        </ul>
                        <p className=" text-[#2c3a54] mb-5">Выбор конкретного способа оформления зависит от конкретной модели памятника. Поэтому для того, что оценить финальный вид надгробия мы предоставляем макет памятника. В магазине в Минске представлены образцы памятников со всеми вариантами художественного оформления и форм.</p>
                        <p className=" text-[#2c3a54] mb-5">Для консультации по оформлению памятников звоните по телефонам, указанным в шапке сайта или приходите в офис. Будем рады помочь Вам выбрать и заказать изделие.</p>
                    </div>
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-12.5 lg:mb-15">
                <Promo />
            </div>
        </>
    );
};

export default DesignPage;