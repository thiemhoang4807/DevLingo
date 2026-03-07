import type { JSX } from "react";
import "./Body.css";

// Use ReactDOM to render, we will render into body-render

function load_menu(title: string, list_menu: JSX.Element[]) {

    return (
        <div className="inter h-[265px] p-[20px]">
            <h3 className="border-b border-[#374151] pb-[12px] w-[344px] font-[700] font-bold text-[18px] leading-[28px] text-[#000000] dark:text-[#FFFFFF] text-left cursor-default"> 
                {title}
            </h3>
            <div className="text-left">
                <ol className="list-decimal list-inside">
                    {list_menu}
                </ol>
            </div>
        </div>
    );

}


export default function Body() {

    const listRAT: string[] = [
        "Zero Trust Architecture",
        "Edge Computing",
        "GraphQL",
        "WebAssembly",
        "DevSecOps"
    ]; // Create list for Recently Added Terms
    const listRAT_li = listRAT.map(el => (
        <li key={el} className="font-[500] font-medium text-[16px] leading-[24px] pt-[12px] 
                                marker:text-[#6B7280]">
            <a href="#" className="text-[#3B82F6] pl-[12px]"> {el} </a>
        </li>
    ))

    const listTT: string[] = [
        "LLM (Large Language Model)",
        "Prompt Engineering",
        "Generative AI",
        "Quantum Computing",
        "Ransomware"
    ]; // Create list for Trending Terms
    const listTT_li = listTT.map(el => (
        <li key={el} className="font-[500] font-medium text-[16px] leading-[24px] pt-[12px] 
                        marker:text-[#6B7280]">
            <a href="#" className="text-[#3B82F6] pl-[12px]"> {el} </a>
        </li>
    ));

    return (
        <div className="skeleton-body py-[40px] px-[32px] bg-[#FFFFFF] dark:bg-[#212121]">
            <div className="body flex flex-row justify-between gap-[32px]">

                <div id="body-render" className="flex flex-1"></div>

                <div className="menu w-[384px] h-[562px] flex flex-col gap-[32px]">
                    {load_menu("Recently Added Terms", listRAT_li)}
                    {load_menu("Trending Terms", listTT_li)}
                </div>

            </div>
        </div>
    );
}