import "./Header.css";
import { Sun, GraduationCap } from "lucide-react";

export default function Header() {

    const tabs: string[] = ["Terms", "Quizzes", "Community"]; // Create list tabs
    // Create <li></li> for each tabs
    const tabs_li = tabs.map(el => (
        <li key={el} className="list-none cursor-pointer font-[500] font-medium text-[16px] leading-[24px] text-[#D1D5DB]
                                h-[64px] w-[70px] flex items-center justify-center ease-in-out">
            <a href="#"> {el} </a>
        </li>
    )); 

    return (
        <div className="inter header flex justify-between h-[65px] border border-[#374151] border-b-[1px] pr-8 pl-8 bg-[#1E1E1E]">
            <div className="header__logo flex h-[65px] w-[187.27px] text-[#fff] t-[18px] cursor-pointer" title="DevLingo">
                <div className="header__logo__icon flex justify-center items-center w-[35.54px] pr-[8px]">
                    <GraduationCap className="w-[27.54px] h-[22.5px]" color="#3B82F6"/>
                </div>
                <div className="header__logo__name flex justify-start items-center w-[151.73px] h-28px font-[700] font-bold text-[20px]
                                leading-[28px] tracking-[-.5px] text-[#E5E7EB]">
                    <p> DevLingo </p>
                </div>
            </div>

            <div className="header__menubar w-[442.43px] flex text-[#fff] justify-end items-center">
                <div className="header__menubar__tabs flex gap-[32px]">
                    {tabs_li}
                </div>
                <div className="header__menubar__icon pt-[8px] pr-[8px] pb-[8px] pl-[40px]">
                    <Sun fill="#D1D5DB" color="#D1D5DB" className="cursor-pointer"/>
                </div>
                <div className="header__menu__login w-[110.88px] h-[40px] pl-[32px flex justify-end items-center">
                    <a href="#" className="bg-[#3B82F6] py-[8px] px-[16px] rounded-[6px]">
                        <p className="font-medium leading-[24px] text-[16px] font-[500] text-[#FFFFFF]"> Log in </p>
                    </a>
                </div>
            </div>
        </div>
    );
}