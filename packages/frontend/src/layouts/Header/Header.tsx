import "./Header.css";
import iconUser from "../../assets/images/icon_user.png";
import iconLogo from "../../assets/images/icon_logo.png";
import { Sun, GraduationCap, Search, Moon } from "lucide-react";

export default function Header() {

    const tabs: string[] = ["Terms", "Quizzes", "Contribution"]; // Create list tabs
    // Create <li></li> for each tabs
    const tabs_li = tabs.map(el => (
        <li key={el} className="li list-none cursor-pointer font-[500] font-medium text-[16px] leading-[24px] text-[#D1D5DB]
                                h-[64px] w-[70px] flex flex-col items-center justify-center">
            <a href="#"> {el} </a>
            <div className="line-effect relative w-[100px] h-[5px] rounded-[5px] bg-[#3B82F6] top-[17.55px]"></div>
        </li>
    )); 

    return (
        <div className="inter header flex justify-between h-[65px] border border-[#374151] border-b-[1px] pr-8 pl-8 bg-[#001F83]">
            <div className="flex flex-row items-center">
                <div className="header__logo flex h-[65px] w-[141.54px] text-[#fff] t-[18px] cursor-pointer" title="DevLingo">
                    <div className="header__logo__icon flex justify-center items-center w-[35.54px] pr-[8px]">
                        <img src={iconLogo} className="w-[27.54px] h-[30%]"></img>
                    </div>
                    <div className="header__logo__name flex justify-start items-center w-[151.73px] h-28px font-[700] font-bold text-[20px]
                                    leading-[28px] tracking-[-.5px] text-[#E5E7EB]">
                        <p> DevLingo </p>
                    </div>
                </div>

                <div className="header__search flex flex-row">
                    <input id="search" placeholder="Search" className="inter w-[306px] border border-[#626262] rounded-[10px] h-[40px]
                                                                        bg-[#E1E1E1] pl-[11.77px] pt-[.58px] text-[#3E3E3E] font-[500]
                                                                        text-[15px] leading-[24px]"></input>
                    <div className="relative header__search__logo flex flex-row items-center justify-center bottom-[-.5px] right-[31.25px]">
                        <button className="flex items-center justify-center cursor-pointer w-[17.65px] h-[17.39px]" id="">
                            <Search className="text-[#4B4949]"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="header__menubar w-[442.43px] flex text-[#fff] justify-end items-center">
                <div className="header__menubar__tabs flex gap-[32px]">
                    {tabs_li}
                </div>
                <div className="header__menubar__icon pt-[8px] pr-[8px] pb-[8px] pl-[40px]">
                    <Moon fill="#D1D5DB" color="#D1D5DB" className="cursor-pointer"/>
                </div>
                <div className="header__menu__login w-[73px] h-[40px] pl-[32px] flex justify-end items-center">
                    <div className="w-[41px] h-[41px] rounded-full bg-[#fafafa] flex items-center justify-center cursor-pointer" title="User">
                        <img src={iconUser} className="rounded-full"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}