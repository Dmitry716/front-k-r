import React from "react";

const Map = () => {
    return (
        <div className="w-full mt-2.5 lg:mt-7.5" style={{
                boxShadow: '0 2px 5px rgba(44, 58, 84, .05)'
        }}>
            {/* Заголовок */}
            <h2 className="px-5 py-7.5 lg:p-7.5 text-[24px] font-bold text-black">Как к нам добраться</h2>

            {/* Контейнер карты */}
            <div className="relative overflow-hidden">
                {/* Ссылки (обычно добавляются Яндекс.Картами автоматически, но можно включить в разметку) */}
                <a
                    href="https://yandex.ru/maps/org/kamennaya_roza/131130763398/?utm_medium=mapframe&utm_source=maps"
                    style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}
                    className="z-10" // Повышаем z-index, чтобы ссылка была поверх iframe, если нужно
                >
                    Каменная роза
                </a>
                <a
                    href="https://yandex.ru/maps/154/vitebsk/category/production_of_tombstones/184108363/?utm_medium=mapframe&utm_source=maps"
                    style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}
                    className="z-10"
                >
                    Изготовление памятников и надгробий в Витебске
                </a>
                <a
                    href="https://yandex.ru/maps/154/vitebsk/category/funeral_services/184108367/?utm_medium=mapframe&utm_source=maps"
                    style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "28px" }}
                    className="z-10"
                >
                    Ритуальные услуги в Витебске
                </a>

                {/* Встраиваемая карта */}
                <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=30.249887%2C55.181719&mode=search&oid=131130763398&ol=biz&z=17.1"
                    width="100%" // Используем 100% ширины контейнера
                    height="400"
                    frameBorder="0"
                    allowFullScreen={true}
                    style={{ position: "relative" }} // Убираем inline-стиль, если он не обязателен
                    className="w-full" // Убедимся, что iframe занимает всю ширину родителя
                ></iframe>
            </div>
        </div>
    );
};

export default Map;