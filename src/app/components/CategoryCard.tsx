import Image from "next/image";

interface CategoryCardProps {
  category: {
    title: string;
    img: string;
    link: string;
    price?: string;
  };
  index: number;
  isTablet: boolean;
}

export default function CategoryCard({ category, index, isTablet }: CategoryCardProps) {
  return (
    <a
      href={category.link}
      className="block overflow-hidden rounded-lg"
    >
      <div className="relative flex h-20 lg:h-[120px] py-5 pl-3.75 pr-12.5 lg:pr-25 justify-between bg-[#f5f6fa] rounded-lg hover:border-2 border-[#2c3a54]">
        <div className="flex flex-col w-[70%] self-center z-10">
          <h2 className="text-[16px] font-bold text-[#222222] mb-2.5">
            {category.title}
          </h2>
          <p className="text-[12px] text-[#969ead]">
            {category.price || "\u00A0"}
          </p>
        </div>
        <div className="absolute self-center -right-2 rounded-lg max-w-[130px] overflow-hidden">
          <Image
            src={category.img}
            alt={category.title}
            width={130}
            height={130}
            className={`h-full object-cover rounded-lg ${isTablet ? 'w-[75px]' : 'w-[130px]'}`}
            sizes="(max-width: 768px) 75px, 130px"
            quality={60}
            priority={index < 3}
          />
        </div>
      </div>
    </a>
  );
}
