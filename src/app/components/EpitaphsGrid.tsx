import Image from "next/image";
import { Epitaph } from "../types/types";

interface EpitaphsGridProps {
    epitaphs: Epitaph[];
}

export default function EpitaphsGrid({ epitaphs }: EpitaphsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 space-y-5">
            {epitaphs.map((epitaph, index) => (
                <div key={epitaph.id || index} className="px-2.5">
                    <div className="p-5 border h-full border-[#f5f6fa] bg-white flex flex-col items-center justify-center transition-colors duration-200">
                        <Image
                            width={40}
                            height={40}
                            src="/rose.svg"
                            alt="Rose icon"
                            className="mb-2.5"
                        />
                        <span className="text-[#2c3a54] text-[14px] lg:text-[16px] font-bold text-center">
                            {epitaph.text}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
