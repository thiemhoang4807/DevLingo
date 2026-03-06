import "./TermPage.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function TermPageCategorySpecializedLetter() {

    const termList: string[] = []; // Create term list
    for (let i = 0; i < 46; i++) { termList[i] = "TERMS"; }
    const termList_li = termList.map(el => (
        <li key={el} className="list-none bg-[#4A4A4A] rounded-[6px] border border-[#777676] flex flex-row gap-[16px] items-center p-[16px] h-[66px] cursor-pointer">
            <div className="icon w-[32px] h-[32px] rounded-[6px] flex items-center justify-center bg-linear-to-b from-[#B1B1B1] to-[#4B4B4B]">
                <p className="cursor-default font-bold text-[14px] text-[#FFFFFF] leading-[20px]">
                    A
                </p>
            </div>

            <div className="content flex-1 text-left">
                <p className="font-[400] text-[16px] text-[#FFFEFE] leading-[24px]">
                    {el}
                </p>
            </div>
        </li>
    ));

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

    // else
    // Render layout
    return createPortal(
        // Render in here
        <div className="inter container flex flex-col gap-[50px]">

            <div className="container__titile">
                <h2 className="font-bold text-[30px] text-[#E5E7EB] text-left leading-[32px]">
                    Terms that start with 'A"
                </h2>
            </div>

            <div className="container__list flex flex-col gap-[10px]">
                {termList_li}
            </div>
        </div>,
        bodyRender
    );
}