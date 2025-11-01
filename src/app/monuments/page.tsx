"use client";
import { useEffect, useState } from "react";
import OurWorksSlider from "../components/OurWorksSlider";
import PathPage from "../components/PathPage";
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { categoriesMonuments } from "../mock/categories";
import { apiClient, API_ENDPOINTS } from "../../lib/api-client";
import { ColorOption } from "../types/types";

// Функция для обработки данных памятника (парсинг JSON полей)
function processMonumentData(dbProduct: Record<string, unknown>) {
    // Парсим цвета из БД
    let parsedColors: ColorOption[] = [];
    if (typeof dbProduct.colors === 'string') {
        try {
            parsedColors = JSON.parse(dbProduct.colors as string);
        } catch (e) {
            console.warn('Failed to parse colors:', dbProduct.colors);
            parsedColors = [];
        }
    } else if (Array.isArray(dbProduct.colors)) {
        parsedColors = dbProduct.colors as ColorOption[];
    }

    return {
        ...dbProduct,
        colors: parsedColors
    };
}

// Функция для получения продуктов для конкретной страницы
const getProductsForPage = (cards: any[], page: number, productsPerPage: number) => {
    const startIndex = (page - 1) * productsPerPage;
    return cards.slice(startIndex, startIndex + productsPerPage);
};

// Функция для получения количества страниц
const getTotalPages = (totalProducts: number, productsPerPage: number) => {
    return Math.ceil(totalProducts / productsPerPage);
};

const MonumentsPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(60); // По умолчанию показываем 60 товаров
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);
    const [monuments, setMonuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Загрузка данных памятников
    useEffect(() => {
        const fetchMonuments = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(API_ENDPOINTS.monuments);
                if (response.success) {
                    // Обрабатываем данные перед установкой в state
                    const processedMonuments = response.data.map((monument: any) => 
                        processMonumentData(monument)
                    );
                    setMonuments(processedMonuments);
                }
            } catch (error) {
                console.error("Error loading monuments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMonuments();
    }, []);

    // Для адаптивности
    useEffect(() => {
        setIsClient(true)
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1024);
            setIsMobile(width < 768);
            setIsNarrowMobile(width < 420)
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Получаем продукты для текущей страницы
    const currentProducts = getProductsForPage(monuments, currentPage, productsPerPage);

    // Рассчитываем общее количество страниц
    const totalPages = getTotalPages(monuments.length, productsPerPage);

    // Обработчик изменения количества товаров на странице
    const handleProductsPerPageChange = (count: number) => {
        setProductsPerPage(count);
        setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества
    };

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
                        <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Гранитные памятники на могилу</h1>

                        {/* Блок категорий */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-7.5">
                            {categoriesMonuments.map((category) => (
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

                    {/* Выбор количества товаров на страницу */}
                    <div hidden={isTablet} className="flex justify-end mb-5">
                        <span className="text-[14px] text-[#6B809E] mr-2 self-center">Выводить по:</span>
                        {[60, 120].map((count) => (
                            <button
                                key={count}
                                onClick={() => handleProductsPerPageChange(count)}
                                className={`px-2 py-1 mx-1 text-[14px] font-medium rounded text-[#2c3a54] ${productsPerPage === count
                                    ? ""
                                    : "cursor-pointer underline underline-offset-3 hover:no-underline"
                                    }`}
                            >
                                {count}
                            </button>
                        ))}
                        <button
                            onClick={() => handleProductsPerPageChange(monuments.length)}
                            className={`px-2 py-1 mx-1 text-[14px] font-medium rounded text-[#2c3a54] ${productsPerPage === monuments.length
                                ? ""
                                : "cursor-pointer underline underline-offset-3 hover:no-underline"
                                }`}
                        >
                            Все
                        </button>
                    </div>

                    {/* Сетка продуктов */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg">Загрузка памятников...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 mb-7.5">
                            {isClient ? (
                                currentProducts.map((product: any, index: number) => (
                                    <ProductCard
                                        key={`${product.category || 'unknown'}-${product.id}-${index}`}
                                        product={product}
                                        isTablet={isTablet}
                                        isMobile={isMobile}
                                        isNarrowMobile={isNarrowMobile}
                                    />
                                ))
                            ) : (
                                currentProducts.map((product: any, index: number) => (
                                    <div key={`placeholder-${product.category || 'unknown'}-${product.id}-${index}`} className="invisible h-0" />
                                ))
                            )}
                        </div>
                    )}

                    {/* Пагинация */}
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        initialPage={1}
                    />

                    {/* Описание страницы */}
                    <div className="mt-7.5 font-[600] shadow-md p-7.5 rounded-lg">
                        {/* Первый абзац */}
                        <p className=" text-[#2c3a54] mb-5">
                            «Каменная роза» специализируется на изготовлении, доставке и установке памятников. Мы предлагаем только качественные изделия, которые становятся символом памяти и уважения к ушедшим. Мы понимаем, что каждый памятник — это отражение уникальной личности и истории. Поэтому мы работаем, создавая индивидуальный дизайн, который соответствует пожеланиям клиентов.
                        </p>

                        {/* Второй абзац */}
                        <p className=" text-[#2c3a54] mb-5">
                            В производстве монументов мы используем только лучший гранит из месторождений России, Финляндии, Норвегии, Индии, Бразилии, что обеспечивает долговечность и эстетическую привлекательность изделий. Наши гранитные памятники устойчивы к воздействию внешней среды и сохраняют свой первоначальный вид на протяжении многих лет.
                        </p>

                        {/* Заголовок "Преимущества памятников из гранита" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Преимущества памятников из гранита</h2>
                        <p className=" text-[#2c3a54] mb-5">Памятники из гранита отличаются следующими плюсами:</p>
                        <ol className="list-decimal pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>Гранит — это один из самых прочных и устойчивых к воздействию внешней среды материалов. Он не подвержен коррозии, не выцветает и сохраняет свой первоначальный вид на протяжении многих лет.</li>
                            <li>Гранит имеет естественную красоту и разнообразие текстур и цветов. Это позволяет создавать уникальные и привлекательные монументы.</li>
                            <li>Камень выдерживает любые климатические условия — дождь, снег, солнечное излучение. Он не трескается и не деформируется, что обеспечивает долговечность монумента.</li>
                            <li>Заказать памятник из этого материала решают и потому, что он требует минимального ухода. Он легко очищается от загрязнений, и при необходимости обрабатывается специальными средствами для поддержания их внешнего вида.</li>
                            <li>Камень легко обрабатывается, что позволяет создавать надгробные памятники различных форм и стилей — от классических до современных. Это дает возможность сделать монумент уникальным и в соответствии с желаниями заказчика.</li>
                        </ol>

                        {/* Заголовок "Как выбрать памятник из гранита?" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Как выбрать памятник из гранита?</h2>
                        <p className=" text-[#2c3a54] mb-5">Выбор памятника из гранита — это важный и ответственный шаг. Советы ниже помогут сделать правильный выбор.</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li><strong>Изучите материалы.</strong> Природный камень — основной материал для памятников. Мы работаем с более чем 30 породами гранита. И все они имеют разный рисунок и особенности. Изучите самые популярные породы перед тем, как заказывать памятник.</li>
                            <li><strong>Выберите стиль и дизайн.</strong> Рассмотрите различные стили памятников. Обратите внимание на каталог памятников из гранита. Там Вы найдете разные формы (прямоугольные, круглые, фигурные) и элементы дизайна (барельефы, колонны, кресты). Учитывайте предпочтения покойного и желания семьи.</li>
                            <li><strong>Ознакомьтесь с примерами работ.</strong> Готовые работы лучше любых макетов и эскизов позволяют оценить качество исполнения и внешний вид изделия.</li>
                            <li><strong>Определите бюджет.</strong> Рассмотрите цены и сопоставьте с тем, сколько Вы готовы потратить денег на покупку. Это сузит выбор, поможет избежать ненужных затрат.</li>
                            <li><strong>Обратите внимание на детали.</strong> Обратите внимание на качество отделки, резьбы и других деталей памятника. Хорошо выполненные работы будут выглядеть аккуратно и привлекательно даже спустя много лет.</li>
                            <li><strong>Учитывайте размеры и расположение.</strong> Перед заказом памятника уточните размеры места, где он будет установлен. Это поможет избежать ситуаций, когда памятник не подходит по размеру на выделенный на кладбище участок.</li>
                            <li><strong>Убедитесь в наличии гарантии.</strong> Перед покупкой уточните, предоставляет ли компания гарантию на свою продукцию. Это важный аспект, который защитит вас от возможных дефектов или повреждений изделия в будущем.</li>
                            <li><strong>Получите ответы на все вопросы.</strong> Мы хорошо знаем свою работу и ответим на все вопросы касательно конструкции памятника, видов гранита и особенностей установки. Менеджер поможет заказать лучший памятник, исходя из ваших пожеланий и бюджета.</li>
                        </ul>

                        {/* Заголовок "Виды изготавливаемых памятников" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Виды изготавливаемых памятников</h2>
                        <p className=" text-[#2c3a54] mb-5">Существует несколько классификаций памятников. По количеству усопших памятники бывают:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>одиночными;</li>
                            <li>двойными;</li>
                            <li>семейными (для трёх и более человек).</li>
                        </ul>
                        <p className=" text-[#2c3a54] mb-2.5">По внешнему виду и форме памятники делят на:</p>
                        <ul className="list-disc pl-5  text-[#2c3a54] space-y-1 mb-5">
                            <li>вертикальные (высота больше, чем ширина);</li>
                            <li>горизонтальные (ширина больше, чем высота);</li>
                            <li>строгие (прямоугольная форма);</li>
                            <li>фигурные;</li>
                            <li>со скульптурной резкой (с вырезанными скульптурами ангелов, цветов, деревьев и др.);</li>
                            <li>комбинированные (в одном памятнике сочетается несколько пород гранита);</li>
                            <li>в виде креста;</li>
                            <li>в виде сердца.</li>
                        </ul>

                        {/* Абзац после списка */}
                        <p className=" text-[#2c3a54] mb-5">
                            Каталог памятников на сайте компании включает более 500 моделей. Выбор между ними всеми зависит от семейной ситуации, пожеланий родственников и значимости увековечения памяти.
                        </p>

                        {/* Заголовок "Цены на памятники из гранита в Минске" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Цены на памятники из гранита в Минске</h2>
                        <p className=" text-[#2c3a54] mb-5">Цена на памятники в Минске зависит от многих факторов.</p>
                        <p className=" text-[#2c3a54] mb-2.5">
                            Разные сорта гранита имеют разные цены. Самые доступные породы камня - Габбро Диабаз, Елизовский или Балтийский, Гранатовый Амфиболит, Мансуровский и другие виды гранита из России. Финские, Индийские, Норвежские породы дороже в первую очередь из-за сложности доставки.
                        </p>
                        <p className=" text-[#2c3a54] mb-2.5">
                            Чем больше монумент, тем выше его стоимость. Размер влияет на количество используемого материала и трудозатраты. Существуют стандартные размеры для каждой детали надгробия: стелы, подставки, цветника, надгробной плиты. Однако при желании любой элемент можно увеличить или уменьшить в соответствии с индивидуальным эскизом.
                        </p>
                        <p className=" text-[#2c3a54] mb-2.5">
                            Стоимость памятника также зависит от формы, дизайна. Сложные формы и индивидуальные дизайны требуют больше времени и навыков для изготовления, что увеличивает прайс. Фигурные монументы или памятники с уникальными элементами также будут дороже, чем стандартные модели.
                        </p>
                        <p className=" text-[#2c3a54] mb-2.5">
                            Объем и сложность гравировки также влияют на цену. Простая надпись будет стоить меньше, чем детальная гравировка с изображениями.
                        </p>
                        <p className=" text-[#2c3a54] mb-2.5">
                            Наличие дополнительных элементов, таких как колонны, скульптуры, цветники или другие декоративные детали, увеличивает общую стоимость конструкции. Услуги по доставке, монтажу также влияют на прайс.
                        </p>

                        {/* Заголовок "Преимущества создания памятников в «Каменная роза»" */}
                        <h2 className="text-[24px] font-bold text-[#2c3a54] mb-3.75">Преимущества создания памятников в «Каменная роза»</h2>
                        <p className=" text-[#2c3a54] mb-5">Мы предлагаем гранитные памятники на понятных, выгодных и простых условиях. Наши преимущества:</p>
                        <ol className="list-decimal pl-5  text-[#2c3a54] space-y-1">
                            <li><strong>Широкий ассортимент.</strong> Наш каталог насчитывает более 500 моделей памятников, а количество пород гранита - более 30.</li>
                            <li><strong>Индивидуальный подход.</strong> Если Вы не найдете подходящую модель в каталоге, мы нарисуем памятник с нуля по вашему эскизу или словесному описанию.</li>
                            <li><strong>Мы обеспечим высокое качество изделий.</strong> Все гарантийные обязательства прописаны в договоре.</li>
                            <li><strong>Профессиональная консультация.</strong> Ответим на все вопросы касательно памятника, художественного оформления, установки и благоустройства на кладбище.</li>
                            <li><strong>Дополнительные услуги.</strong> Кроме изготовления памятников, «Каменная роза» оказывает услуги по установке, благоустройству мест захоронений, художественному оформлению, демонтажу старых изделий.</li>
                            <li><strong>Официальный договор.</strong> Все устные договоренности оформляем с подробным описанием изготавливаемых изделий и оказываемых услуг.</li>
                            <li><strong>Доступные цены.</strong> Мы следим за ценами на памятники в Минске и гарантируем лучшую стоимость.</li>
                            <li><strong>Положительные отзывы.</strong> У нас более 100 честных положительных отзывов на картах Google и Яндекс.</li>
                        </ol>
                        <p className=" text-[#2c3a54] mt-5">Чтобы купить памятник в Минске, достаточно позвонить нам или оставить заявку на сайте. Мы поможем с выбором, организуем доставку и монтаж.</p>
                    </div>

                    {/* Блок "Другие категории" */}
                    <div className={`mt-17 lg:mt-30 ${isTablet ? 'container-centered' : ''}`}>
                        <h2 className="text-[28px] font-bold text-[#2c3a54] ml-2.5 mb-3.5 lg:mb-5">Другие категории</h2>
                        {/* Общий блок с flex */}
                        <div className={`flex flex-wrap ${isNarrowMobile ? 'flex-col space-y-2.5' : ''}`}>
                            {/* Карточка "Услуги" */}
                            <div className={`px-1.25 md:px-2.5 max-w-1/2 flex-1/2 min-h-[60px] lg:min-h-[140px] ${isNarrowMobile ? 'max-w-full' : ''}`}>
                                <a
                                    href="/services"
                                    className="block overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full items-center p-7.5"
                                >
                                    {/* Текст */}
                                    <h2 className="text-[16px] font-bold text-[#222222] self-start">Услуги</h2>
                                    {/* Изображение с абсолютным позиционированием */}
                                    <img
                                        src="/landscape.webp"
                                        alt="Услуги"
                                        className="w-[75px] lg:w-[130px] h-auto object-cover rounded-lg"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                </a>
                            </div>

                            {/* Карточка "Ограды" */}
                            <div className={`px-1.25 md:px-2.5 max-w-1/2 flex-1/2 min-h-[60px] lg:min-h-[140px] ${isNarrowMobile ? 'max-w-full' : ''}`}>
                                <a
                                    href="/fences"
                                    className="block overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full items-center p-7.5"
                                >
                                    {/* Текст */}
                                    <h2 className="text-[16px] font-bold text-[#222222] self-start">Ограды</h2>
                                    {/* Изображение с абсолютным позиционированием */}
                                    <img
                                        src="/fences.webp"
                                        alt="Ограды"
                                        className="w-[75px] lg:w-[130px] h-auto object-cover rounded-lg"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-22.5">
                <OurWorksSlider />
            </div>
        </>
    );
};

export default MonumentsPage;