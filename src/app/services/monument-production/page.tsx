"use client";
import { useEffect, useState } from "react";
import PathPage from "@/app/components/PathPage";
import SidebarCatalogMenu from "@/app/components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "@/app/components/Sidebar/SidebarStickyHelp";
import Promo from "@/app/components/Promo";
import Link from "next/link";

const MonumentProductionPage = () => {
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
                        <h1 className="text-black text-[28px] mt-2.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Изготовление памятников</h1>
                    </div>

                    {/* Основной контент */}
                    <div className="mt-7.5 font-[600] shadow-xs p-5 lg:p-7.5 rounded-lg">
                        {/* Введение */}
                        <p className="text-[#2c3a54] mb-5">
                            Изготовление памятников — сложный процесс, который состоит из нескольких этапов: выбор формы памятника, размеров, способа художественного оформления, цвета гранита.
                        </p>

                        <p className="text-[#2c3a54] mb-5">
                            В первую очередь необходимо определиться с формой памятника.
                        </p>

                        {/* Виды памятников */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Виды памятников в гранитной мастерской «Каменная роза»</h2>
                        <p className="text-[#2c3a54] mb-5">
                            Габариты памятников складываются из размеров отдельно взятых компонентов. Классический памятник состоит из 3 элементов: стелы (верхняя часть, предназначенная для нанесения информации об усопшем), подставки (место крепления стелы) и цветочницы. Стандартные размеры стелы - 100x50x5 см (высота, ширина, толщина) и 80x40(50)x5 см. Также существуют модели со стелами 60x40x5 см, 120x60x5 см и другие.
                        </p>

                        {/* Примеры памятников */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Примеры памятников со стелами высотой 60, 80 и 100 см соответственно представлены на рисунке ниже.</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/9.webp" alt="Примеры памятников со стелами высотой 60, 80 и 100 см" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* По предназначению надгробия */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">По предназначению надгробия делаются на:</h2>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Одиночные - для обозначения могилы одного человека;</li>
                            <li>Двойные (семейные);</li>
                            <li>В виде креста;</li>
                            <li>В виде сердца;</li>
                            <li>Эксклюзивные (комбинированные) - к ним относятся модели, при изготовлении которых используется несколько пород гранита.</li>
                        </ul>
                        <p className="text-[#2c3a54] mb-5">
                            Сочетание ограды, памятника, фундамента формирует мемориальный комплекс.
                        </p>


                        {/* Пример одиночного, двойного и эксклюзивного памятников */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Пример одиночного, двойного и эксклюзивного памятников</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/10.webp" alt="Пример одиночного, двойного и эксклюзивного памятников" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Пример одиночного и эксклюзивного памятников */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Пример одиночного и эксклюзивного памятников</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/11.webp" alt="Пример одиночного и эксклюзивного памятников на фото" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Дополнение стандартного комплекса */}
                        <p className="text-[#2c3a54] mb-5">
                            Дополнить стандартный комплекс можно другими изделиями из гранита. Например, целой надгробной плитой. Надгробная плита монтируется на цветник, полностью закрывая его. Это лишает Вас необходимости очищать цветник от листьев и другого мусора. Кроме того надгробные плиты предназначены для крепления на них ваз и лампадок.
                        </p>

                        {/* Виды гранита */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Виды гранита для изготовления памятников</h2>
                        <p className="text-[#2c3a54] mb-5">
                            Традиционно надгробные сооружения изготавливаются из следующих материалов:
                        </p>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Гранит</li>
                            <li>Мрамор</li>
                            <li>Бетонная крошка.</li>
                        </ul>
                        <p className="text-[#2c3a54] mb-5">
                            С течение времени лучше всего себя зарекомендовал гранит. Он обладает хорошими показателями морозостойкости (легко переносит резкие перепады температур, сильную жару и сильный холод).
                        </p>

                        {/* Лучшие породы гранита */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Лучшие породы гранита и страна происхождения:</h2>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Габбро-диабаз, Карелия (Россия)</li>
                            <li>Дымовский, Россия</li>
                            <li>Мансуровский, Россия</li>
                            <li>Куру Грей, Финляндия</li>
                            <li>Аврора, Финляндия</li>
                            <li>Балморал Ред, Финляндия</li>
                            <li>Балтик Грин, Финляндия.</li>
                        </ul>

                        {/* Лучшие породы гранита для изготовления памятников */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Лучшие породы гранита для изготовления памятников</h3>
                        <div className="mb-5">
                            <img src="/services/monuments/12.webp" alt="Лучшие породы гранита для изготовления памятников" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Оптимальный вариант */}
                        <p className="text-[#2c3a54] mb-5">
                            Безусловно, самый оптимальный вариант по соотношению цена-качество — гранит Габбро-диабаз. Это надежный камень, который отлично подходит для всех вариантов художественного оформления.
                        </p>

                        {/* Стадии обработки гранита */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Стадии обработки гранита</h2>
                        <p className="text-[#2c3a54] mb-5">
                            Гранит поступает на производственное предприятие в виде каменной глыбы весом от 8 тонн. Далее гранитные блоки распиливаются на более маленькие фрагменты (слэбы). Из слэбов выпиливаются заготовки стел, подставок и цветников. На последнем этапе резки скульптор придает заготовкам нужную форму.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            После резки наступает этап полировки, после которой гранит приобретает блеск, глянцевость, проявляет текстуру камня.
                        </p>

                        {/* Этапы производства памятника */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Этапы производства памятника:</h2>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Распиловка блоков на слэбы</li>
                            <li>Подготовка заготовок стел, подставок и цветников</li>
                            <li>Полировка</li>
                            <li>Художественное оформление.</li>
                        </ul>

                        {/* Художественное оформление */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Художественное оформление памятника</h2>
                        <p className="text-[#2c3a54] mb-5">
                            Существует несколько способов художественного оформления. При выбор подходящего способа нужно учитывать породу гранита, форму и размеры.
                        </p>

                        {/* Способы нанесения текста */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Способы нанесения текста:</h3>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Гравировка с помощью станка</li>
                            <li>Глубокая гравировка пескоструйным аппаратом</li>
                            <li>Сусальное золото</li>
                            <li>Накладные буквы.</li>
                        </ul>
                        <p className="text-[#2c3a54] mb-5">
                            Порода гранита Габбро-диабаз позволяет выбирать любой способ нанесения текста.
                        </p>

                        {/* Методы изображения портрета */}
                        <h3 className="lg:text-[20px] font-bold text-[#2c3a54] mb-2.5">Методы изображения портрета:</h3>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1 mb-5">
                            <li>Гравировка</li>
                            <li>Медальон (керамогранит, металл, фарфор, триплекс-стекло).</li>
                        </ul>

                        {/* Индивидуальность и декоративные аксессуары */}
                        <p className="text-[#2c3a54] mb-5">
                            Придать надгробному комплексу индивидуальность можно с помощью нанесения дополнительных декоративных на переднюю или заднюю поверхность стелы. Каталог рисунков включает: ветки розы, гвоздики, деревья, иконы, тематические рисунки. Возможно изображение любого рисунка по пожеланию заказчика.
                        </p>
                        <p className="text-[#2c3a54] mb-5">
                            Также для заказа доступны декоративные аксессуары из бронзы: кресты, изваяния, рамки для медальонов, лампады, вазы. Бронзовые аксессуары выглядят солидно и не теряют первозданный вид на протяжении многих лет.
                        </p>

                        {/* Изготовление памятников */}
                        <h2 className="lg:text-[24px] font-bold text-[#2c3a54] mb-3.75">Изготовление памятников</h2>
                        <p className="text-[#2c3a54] mb-5">
                            Компания k-r.by имеет большой опыт в производстве одиночных, эксклюзивных и других памятников и установке в Минске и области. Заказ любого товара и услуги сопровождается заключением договора. Мы предоставляем гибкую систему оплаты, которая в том числе подразумевает рассрочку на срок от 3 до 6 месяцев.
                        </p>

                        {/* Перейти в разделы */}
                        <p className="text-[#2c3a54] mb-2.5">
                            Перейти в разделы:
                        </p>
                        <ul className="list-disc pl-10 text-[#2c3a54] space-y-1">
                            <li><Link href={"/"} className="text-[#969ead]">Установка памятников</Link></li>
                            <li><Link href={"/"} className="text-[#969ead]">Установка оград</Link></li>
                        </ul>
                    </div>

                    {/* Блок "Другие категории" */}
                    <div className={`mt-17 lg:mt-30 ${isTablet ? 'container-centered' : ''}`}>
                        <h2 className="text-[28px] font-bold text-[#2c3a54] ml-2.5 mb-3.5 lg:mb-5">Другие категории</h2>
                        {/* Общий блок с flex */}
                        <div className={`flex flex-wrap ${isNarrowMobile ? 'flex-col space-y-2.5' : ''}`}>
                            {/* Карточка "Демонтаж памятников" */}
                            <div className={`px-1.25 md:px-2.5 max-w-1/2 flex-1/2 min-h-[60px] lg:min-h-[140px] ${isNarrowMobile ? 'max-w-full' : ''}`}>
                                <a href="/monument-demolition" className="block overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full items-center pr-40 p-7.5">
                                    {/* Текст */}
                                    <h2 className="text-[16px] font-bold text-[#222222] self-start">Демонтаж памятников</h2>
                                    {/* Изображение с абсолютным позиционированием */}
                                    <img
                                        src="/services/monument-dismantle.webp"
                                        alt="Демонтаж памятников"
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

export default MonumentProductionPage;