import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function TermPageCategory() {
    // Set up bodyRender is null initally
    const [bodyRender, setBodyRender] = useState<Element | null>(null);

    useEffect(() => {
        // DOM ready
        // Get body-render
        setBodyRender(document.getElementById("body-render"));
    }, []); // Run only once

    // If body-render is not exist, null
    // Return empty layout
    if (!bodyRender) return <></>; 

    const categoriesList: string[] = ["Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1"];
    const categoriesList_li = categoriesList.map(el => (
        <li key={el} className="category_items cursor-pointer list-none w-[280px] h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center
                                bg-[#3B82F6] font-[600] text-[17px] leading-[32px] text-[#FFFFFF]">
            {el}
        </li>
    ));

    const alphabetList: string[] = ["#", "A", "B", "C", "D", "E", "F", "G", "H",
                                "I", "J", "K", "L", "M", "N", "O", "P", "Q",
                                "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const alphabetList_li = alphabetList.map(el => (
        <li key={el} className="alphabet_items cursor-pointer list-none w-[118px] h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center
                                bg-[#3B82F6] font-[600] text-[17px] leading-[32px] text-[#FFFFFF]">
            {el}
        </li>
    ));

    // else
    // Render layout
    return createPortal(
        // Render in here
        <div className="inter container flex flex-col items-center justify-start gap-[50px]">

            <div className="container__categories flex flex-col gap-[16px] w-full">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Categories
                </h2>
                <div className="w-full inline-grid grid-cols-4 gap-[10px]">
                    {categoriesList_li}
                </div>
            </div>

            <div className="container__alphabet flex flex-col gap-[16px] w-full">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Alphabet
                </h2>
                <div className="w-full inline-grid grid-cols-9 gap-[10px]">
                    {alphabetList_li}
                </div>
            </div>

        </div>,
        bodyRender
    );
}