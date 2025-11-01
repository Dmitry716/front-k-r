import { Metadata } from 'next';
import OurWorksSlider from '../components/OurWorksSlider';
import PathPage from '../components/PathPage';
import SidebarCatalogMenu from '../components/Sidebar/SidebarCatalogMenu';
import SidebarStickyHelp from '../components/Sidebar/SidebarStickyHelp';
import SidebarInfoMenu from '../components/Sidebar/SidebarInfoMenu';
import SidebarInfoDropdown from '../components/Sidebar/SidebarInfoDropdown';

export const metadata: Metadata = {
    title: "Онлайн и доставка",
    description: "Онлайн и доставка",
};


const PaymentDeliveryPage = () => {
    return (
        <>
            <section className="page-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarInfoMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <div className="w-[100%] block lg:hidden"><SidebarInfoDropdown /></div>
                    <div className='ml-5 lg:ml-0'><PathPage /></div>
                    <div className='p-5 lg:p-7.5 shadow-sm font-[600]'>
                        <h1 className="text-black text-[28px] mb-5 lg:mb-7.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Оплата и доставка</h1>

                        {/* Стандартный способ оплаты */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-2.5">Стандартный способ оплаты:</h2>
                            <ul className="list-disc pl-5 text-[#2c3a54] space-y-1">
                                <li>В офисе продаж заключается договор подряда.</li>
                                <li>Заказчик вносит предоплату в размере от 25 до 50% от общей суммы договора.</li>
                                <li>Остаток по договору заказчик оплачивает после завершения работ или получения товара.</li>
                            </ul>
                        </div>

                        {/* Изображение карт */}
                        <div className="mb-7.5">
                            <img src="/delivery/1.webp" alt="Способы оплаты" className="w-full h-auto" />
                        </div>

                        {/* Памятники в рассрочку */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-5">Памятники в рассрочку</h2>
                            <p className="text-[#2c3a54] mb-2.5">Рассрочка предоставляется на следующие виды памятников:</p>
                            <ul className="list-disc pl-5 text-[#2c3a54] space-y-1">
                                <li>Одиночные;</li>
                                <li>Двойные;</li>
                                <li>В виде креста;</li>
                                <li>В виде сердца;</li>
                                <li>Детские;</li>
                                <li>Эксклюзивные.</li>
                            </ul>
                            <p className="text-[#2c3a54] mt-2.5 italic">*Расчет производится только в национальной валюте – в белорусских рублях (независимо от формы оплаты).</p>
                        </div>

                        {/* Рассрочка Каменная роза */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-5">Рассрочка «Каменная роза»</h2>
                            <div className="flex justify-center">
                                <img src="/delivery/2.webp" alt="0% рассрочка" className="w-[360px] md:w-[436px] h-auto" />
                            </div>
                        </div>

                        {/* Условия оформления */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-3.75">Условия оформления:</h2>
                            <ul className="list-disc pl-5 text-[#2c3a54] space-y-1">
                                <li>Срок - от 2 до 6 месяцев;</li>
                                <li>0% переплаты;</li>
                                <li>Все скидки и акционные предложения сохраняются;</li>
                                <li>Первоначальный взнос от 25 до 50%;</li>
                                <li>Наличие паспорта обязательно;</li>
                                <li>Не зависит от суммы заказа.</li>
                            </ul>
                        </div>

                        {/* Условия оплаты при покупке через k-r.by */}
                        <div className="mb-7.5">
                            <h2 className=" font-bold text-[#2c3a54] mb-3.75">Условия оплаты при покупке через k-r.by:</h2>
                            <ul className="list-disc pl-5 text-[#2c3a54] space-y-1">
                                <li>Внесение оплаты осуществляется в офисе компании;</li>
                                <li>Первый взнос - предоплата от 25 до 50% в день оформления договора;</li>
                                <li>Второй взнос - дата второго и последующих взносов согласовывается индивидуально с каждым клиентом;</li>
                                <li>Возможна оплата в два этапа - первый взнос при оформлении договора, второй - при завершении всех работ;</li>
                                <li>Возможна оплата равными долями до 25 числа каждого месяца. Количество платежей зависит от срока рассрочки.</li>
                            </ul>
                            <p className="text-[#2c3a54] mt-2.5 italic">* При покупке товара в рассрочку, цена на товар остается неизменной</p>
                            <p className="text-[#2c3a54] italic">* Скидка на товар сохраняется</p>
                        </div>

                        {/* Популярные разделы памятников и оград в рассрочку */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-5">Популярные разделы памятников и оград в рассрочку:</h2>

                            {/* Одиночные памятники */}
                            <div className="mb-7.5">
                                <h3 className="font-bold text-[#2c3a54]">Одиночные памятники</h3>
                                <a href="/monuments-single-category" className="block">
                                    <img src="/delivery/3.webp" alt="Коллекция одиночных памятников" className="w-full h-auto rounded-lg" />
                                </a>
                            </div>

                            {/* Двойные памятники */}
                            <div className="mb-7.5">
                                <h3 className="font-bold text-[#2c3a54]">Двойные памятники</h3>
                                <a href="/monuments-double-category" className="block">
                                    <img src="/delivery/4.webp" alt="Коллекция двойных памятников" className="w-full h-auto rounded-lg" />
                                </a>
                            </div>

                            {/* Эксклюзивные памятники */}
                            <div className="mb-7.5">
                                <h3 className=" font-bold text-[#2c3a54]">Эксклюзивные памятники</h3>
                                <a href="/monuments-exclusive-category" className="block">
                                    <img src="/delivery/5.webp" alt="Коллекция эксклюзивных памятников" className="w-full h-auto rounded-lg" />
                                </a>
                            </div>

                            {/* Гранитные ограды */}
                            <div className="mb-7.5">
                                <h3 className=" font-bold text-[#2c3a54]">Гранитные ограды</h3>
                                <a href="/fences-granite-category" className="block">
                                    <img src="/delivery/6.webp" alt="Коллекция гранитных оград" className="w-full h-auto rounded-lg" />
                                </a>
                            </div>
                        </div>

                        {/* Способы оплаты товаров и услуг */}
                        <div className="mb-3.75">
                            <h2 className="font-bold text-[#2c3a54] mb-3.75">Мы предлагаем следующие способы оплаты товаров и услуг:</h2>
                            <ul className="list-disc pl-5  text-[#2c3a54] space-y-1">
                                <li>оплата наличными средствами;</li>
                                <li>безналичный расчет (для юридических лиц);</li>
                                <li>оплата банковской платежной картой.</li>
                            </ul>
                        </div>

                        {/* Что можно купить в рассрочку */}
                        <div className="mb-3.75">
                            <p className="text-[#2c3a54]"><strong>В рассрочку можно купить:</strong> памятники из гранита, гранитные ограды, благоустройство могил.</p>
                        </div>

                        {/* Что нельзя купить в рассрочку */}
                        <div className="mb-7.5">
                            <p className="text-[#2c3a54]"><strong>Рассрочка не распространяется на:</strong> вазы, аксессуары из бронзы и полимербетона, лампады, отдельные доборные элементы к памятникам - надгробные плиты, цветники, столы и скамейки.</p>
                        </div>

                        {/* Доставка */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-2.5">Доставка</h2>
                            <p className="text-[#2c3a54] mb-2.5">Доставка осуществляется бесплатно в радиусе 20 километров от МКАД при заказе благоустройства могилы или установки.</p>
                            <p className="text-[#2c3a54]">Если кладбище находится далее, чем в пределах 20 км от МКАД, то расчёт стоимости осуществляется непосредственно от МКАД до места установки.</p>
                        </div>

                        {/* Примеры наших работ */}
                        <div className="mb-7.5">
                            <h2 className="font-bold text-[#2c3a54] mb-2.5">Примеры наших работ</h2>
                            <img src="/delivery/7.webp" alt="Пример работы 1" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Контакты для уточнения условий */}
                        <div className="mb-0">
                            <h2 className="font-bold text-[#2c3a54] mb-2.5">Уточняйте условия по телефонам:</h2>
                            <p className="text-[#2c3a54] mb-1">+375 33 322-66-52 <span className="font-bold">МТС</span></p>
                            <p className="text-[#2c3a54] mb-7.5">+375 29 622-66-45 <span className="font-bold">A1</span></p>
                            <p className="text-[#2c3a54] font-bold">А также в офисе компании по адресу: пр-т Любимова 26 к3.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <OurWorksSlider />
        </>
    );
};

export default PaymentDeliveryPage;