"use client";
import Link from "next/link";
import React from "react";
import { campaigns } from "../mock/campaigns";

const Promo = () => {

  return (
    <section className="max-w-[1300px] container-centered mt-17 lg:mt-30">
      <h2 className="text-4xl font-bold text-[#2c3a54] ml-2.5 mb-7.5">Наши акции</h2>

      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="w-full md:w-1/3 px-2.5 overflow-hidden"
          >
            <a href={campaign.link} className="block h-full bg-[#f5f6fa] rounded-lg shadow-sm">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="px-4.25 py-3.75 md:p-6">
                <h3 className="font-bold text-md lg:text-xl text-[#2c3a54] mb-1.25">{campaign.title}</h3>
                <p className="text-sm md:text-md text-[#2c3a54cc] leading-relaxed">
                  {campaign.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 flex text-center">
        <Link href={'/'} className="font-bold w-full md:max-w-[338px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition">
          Смотреть все
        </Link>
      </div>
    </section>
  );
};

export default Promo;