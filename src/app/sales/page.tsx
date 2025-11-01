import OurWorksSlider from "../components/OurWorksSlider";
import PathPage from "../components/PathPage";
import type { Metadata } from "next";
import Promo from "./Promo";
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp";

// export const metadata: Metadata = {
//     title: "Акции",
//     description: "Акции",
// };

const SalesPage = () => {
    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <PathPage />

                    <h1 className="text-black text-[28px] mb-5 lg:mb-7.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Акции</h1>
                    <Promo />
                </div>
            </section>
                <OurWorksSlider />
        </>
    );
};

export default SalesPage;
