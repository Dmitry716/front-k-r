"use client";
import { useState, useRef, useEffect } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqData = [
    {
      question: "Как заказать памятник?",
      answer:
        "Для оформления договора на изготовление памятника необходимо посетить офис. Менеджер в офисе максимально подробно проконсультирует об особенностях гранита, художественного оформления и установке.",
    },
    {
      question: "Можно ли получить предварительный расчёт по телефону?",
      answer:
        "Да. Рассчитать предварительную стоимость можно по телефону или путём обращения через мессенджеры: Telegram или Viber. И вместе с тем для максимально точного расчёт стоимости и уточнения всех нюансов рекомендуем посетить офис.",
    },
    {
      question: "Сколько по времени ждать изготовление и установку памятника?",
      answer:
        "Изготовление памятник с нанесением портрета и текста обычно занимает около 30 рабочих дней. Сроки установки зависят от времени года и загруженности мастерской. Например, при заказе памятника весной изготовление и установка памятника занимают от 30 до 60 рабочих дней. При заказе летом срок изготовления и установки может составлять от 60 до 90 рабочих дней.",
    },
    {
      question: "Что брать с собой для оформления договора?",
      answer:
        "Для заключения договора нужно взять с собой паспорт. Принести фотографию усопшего (если нужно сделать гравировку портрета или изготовить медальон). Знать фамилию, имя, отчество и даты жизни усопшего. При заказе установки нужно принести паспорт захоронения (адрес кладбища, место, сектор, ряд на кладбище).",
    },
    {
      question: "Что входит в стоимость памятника на сайте?",
      answer:
        "Стоимость памятника на сайте включает цену стелы, подставки, цветочницы без художественного оформления.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (openIndex === index) {
        ref.style.height = ref.scrollHeight + "px";
      } else {
        ref.style.height = "0px";
      }
    });
  }, [openIndex]);

  return (
    <section className="py-10.5 md:py-22.5">
      <div className="max-w-[1300px] container-centered">
        <div className="max-w-[1000px] px-4 ">
          <div className="justify-items-start mb-5">
            <h2 className="text-[28px] font-bold text-center text-[#2c3a54]">
              Часто задаваемые вопросы
            </h2>
          </div>
          <div>
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-[#cbcbcb]">
                {/* Заголовок-кнопка */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex justify-between text-[#2c3a54] items-center py-5 text-left transition-colors`}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="font-bold max-w-[80%] text-lg md:text-xl leading-relaxed">
                    {item.question}
                  </span>
                  <span className="rounded-full shadow-xl w-[36px] h-[36px] text-center font-bold text-2xl md:text-3xl text-[#2c3a54]">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {/* Контент — только если открыт */}
                <div
                  id={`faq-content-${index}`}
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ height: "0px" }}
                  role="region"
                  aria-labelledby={`faq-title-${index}`}
                >
                  <div className="pb-6 pt-0text-sm md:text-base text-[#2c3a54] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
