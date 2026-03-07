import "./Footer.css";
import iconLogo from "../../assets/images/icon_logo.png";
import { Twitter, Github  } from "lucide-react";

export default function Footer() {

    const learn_list: string[] = ["Browse Terms", "Quizzes", "Flashcards"];
    const learn_list_li = learn_list.map(el => (
        <li key={el} className="list-none text-[#787878] dark:text-[#9CA3AF]">
            <a href="#"> {el} </a>
        </li>
    ));

    const company_list: string[] = ["About Us", "Contact", "Privacy Policy"];
    const company_list_li = company_list.map(el => (
        <li key={el} className="list-none text-[#787878] dark:text-[#9CA3AF]">
            <a href="#"> {el} </a>
        </li>
    ));

    return (
        <div className="inter footer h-[293px] py-[48px] px-[32px]
                        flex flex-col gap-[32px] border-t border-[#1F2937] bg-[#EEEEEE] dark:bg-[#27272A]">

            <div className="footer__info flex justify-between gap-[32px]">

                <div className="footer__info__des flex flex-col w-[280px]">
                    <div className="footer__info__des__logo flex flex-row justify-start items-center w-[280px] cursor-pointer">
                        <img src={iconLogo} className="w-[30.03px] h-[18px] pr-[8px]"></img>
                        <p className="font-[700] font-bold text-[18px] text-[#3B82F6] dark:text-[#E5E7EB] leading-[28px]"> DeLingo </p>
                    </div>
                    <div className="footer__info__des__content w-[280px] h-[40px] font-[400] font-regular text-[14px] leading-[20px] flex justify-start
                                    text-[#787878] dark:text-[#9CA3AF] text-left">
                        <p>The ultimate gamified dictionary for computer and internet terminology.</p>
                    </div>
                </div>

                <div className="footer__info__learn text-[#9CA3AF] w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-[700] font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#3B82F6] dark:text-[#E5E7EB] cursor-default">
                        LEARN
                    </h3>
                    <div className="text-left flex flex-col gap-[8px]">
                        {learn_list_li}
                    </div>
                </div>

                <div className="footer__info__company text-[#9CA3AF] w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-[700] font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#3B82F6] dark:text-[#E5E7EB] cursor-default">
                        COMPANY
                    </h3>
                    <div className="text-left flex flex-col gap-[8px]">
                        {company_list_li}
                    </div>
                </div>

                <div className="footer__info__connect text-[#9CA3AF] w-[280px] flex flex-col items-start gap-[16px]">
                    <div className="foonter__info__connect__content">
                        <h3 className="font-[700] font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#3B82F6] dark:text-[#E5E7EB] cursor-default">
                            CONNECT
                        </h3>
                    </div>
                    <div className="footer__infor__connect__links flex flex-row gap-[16px] text-[#787878]">
                        <a href="#" className="w-[24px] h-[24px]"> <Twitter /> </a>
                        <a href="#" className="w-[24px] h-[24px]"> <Github /> </a>
                    </div>
                </div>

            </div>

            <div className="footer__copyright border-t border-[#374151] pt-[32px] text-center">
                <p className="font-[400] font-regular text-[14px] leading-[20px] text-[#787878] dark:text-[#9CA3AF]">
                    ©2026 DevLingo
                </p>
            </div>

        </div>
    );
}