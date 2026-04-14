import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
// Import ảnh cúp
import top1 from "../assets/profile-page/top1.png"
import top2 from "../assets/profile-page/top2.png"
import top3 from "../assets/profile-page/top3.png"

const period = ["Daily", "Monthly"];

type user = {
    name: string,
    points: string,
    terms: string,
    email?: string,
    colorBgTrophy?: string,
};

// Style cho những người top đầu
var topPlayer: Array<user> = [ 
    {name: "Nguyen Van C", points: "50,000", terms: "6666", colorBgTrophy: "#CDCDCD"},
    {name: "Pham Van C", points: "100,000", terms: "6666", colorBgTrophy: "#FFD365"},
    {name: "Nguyen Van C", points: "20,000", terms: "6666", colorBgTrophy: "#B38A48"}
];

const trophies = [top1, top2, top3]; // Ảnh chapions

// Style cho những người kế tiếp 
const baseUser = {
    points: "3667",
    terms: "12,241",
    email: "@hoangtuaruma"
};

const players: Array<user> = [
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser }
];

// Tạo mảng 1 -> 10
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
// Tạo style chung cho thanh điều hướng trang
const numbersStyle = {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "6px",
    height: "100%",
    color: "#FFFFFF99"
};

export default function LeaderBoard() {
    const [activeTab, setActiveTab] = useState<"daily" | "monthly">("daily"); // Cho thanh điều hướng tháng
    const [index, setIndex] = useState(1); // Cho thanh điều hướng trang

    return (
        <div className={`w-full min-h-screen font-[Inter] transition-colors duration-300 px-12 bg-[#0A0A0A]`}>
            <div className={`w-full min-h-screen`}>
                {/* Thanh điều chỉnh khoảng thời gian */}
                <div className={`w-full h-42 flex items-end justify-center mb-14.75`}>
                    <div className={`w-73 h-9.75 rounded-xl px-1 py-1 flex bg-[#181C2A] drop-shadow-[0_4px_1px_#0C0F1B]`}>
                        {
                            period.map(el => (
                                <li key={el} 
                                    onClick={() => setActiveTab(el.toLocaleLowerCase() as "daily" | "monthly")}
                                    className={`${activeTab === el.toLocaleLowerCase() ? "bg-[#293047]" : ""}
                                                list-none w-35.5 h-7.75 rounded-lg px-6 py-2 text-[#ffffff]
                                                flex items-center justify-center cursor-pointer transition duration-300 ease-in-out`}>
                                    {el} 
                                </li>
                            ))
                        }
                    </div>
                </div>
                {/* Các player thuộc nhóm top */}
                <div className={`w-full flex flex-row gap-2.75 items-center justify-center`}>
                    {
                        topPlayer.map((el, index) => (
                            <div key={index} className={`w-122 h-110 flex flex-col gap-4
                                                        ${index === 1 ? "mb-24" : "mb-0"}`}>
                                {/* Avatar và tên của player */}
                                <div className={`w-full h-35`}>
                                    <div className={`flex flex-col items-center justify-center gap-2.75`}>
                                        <div className={`w-28.5 h-28.5 bg-white rounded-[10px]`}></div>
                                        <div className={``}>
                                            <p className={`text-[#FFFFFF] font-semibold text-2xl`}>
                                                {el.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Vector và thang điểm player */}
                                <div className={``}>
                                    {/* Vector */}
                                    <div    style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
                                            className={`bg-linear-to-t from-[#0B0D16] to-[#181C2A] w-full h-[32.33px]`}></div>
                                    {/* Thang điểm của player */}
                                    <div className={`bg-linear-to-t from-[#0E0F15] via-[#0F1118] to-[#181D2B] w-full h-97 px-[19.25px]`}>
                                        {/* Icon chiếc cúp */}
                                        <div className={`w-full h-12 border border-[#181D2B] border-b-[#FFFFFF12] flex items-center justify-center`}>
                                            <div    style={{ background: el.colorBgTrophy ?? "white" }}
                                                    className={`w-11 h-11 flex items-center justify-center rounded-lg px-1 py-1`}>
                                                <img src={trophies[index]}></img>
                                            </div>
                                        </div>
                                        {/* Points và Terms */}
                                        <div className={`w-full h-full flex flex-col text-[#FFFFFF]`}>
                                            <div className={`w-full h-13.75 flex flex-col items-center justify-between mt-8`}>
                                                <p className={`text-2xl font-semibold`}> {el.points} </p>
                                                <p className={`text-sm font-normal`}> Points </p>
                                            </div>
                                            <div className={`w-full h-13.75 flex flex-col items-center justify-between mt-8`}>
                                                <p className={`text-2xl font-semibold`}> {el.terms} </p>
                                                <p className={`text-sm font-normal`}> Terms </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* Bảng các player */} 
                <div className={`w-full`}>
                    <div className={`w-full flex flex-col gap-4.5`}>
                        {/* Tiêu đề */}
                        <div className={`w-full flex items-center justify-between font-normal text-sm text-[#FFFFFF99] px-4`}>
                            <p> Rank </p>
                            <p> Username </p>
                            <p> Terms Learned </p>
                            <p> Points </p>
                        </div>
                        {/* Players */}
                        <div className={`flex flex-col gap-2`}>
                            {
                                players.map((el, index) => (
                                    <div className={`w-full h-12 flex items-center justify-between bg-[#171C29] rounded-xl px-4`}>
                                        <div className={`h-full flex items-center justify-center text-sm font-semibold leading-5 text-[#ffffff]`}>
                                            <p> {index + 4} </p>
                                        </div>
                                        <div className={`w-50 h-9 flex flex-row gap-2`}>
                                            <div className={`w-8 h-8 bg-white rounded-full`}></div>
                                            <div className={`flex flex-col gap-1 items-start justify-between`}>
                                                <p className={`text-white text-[12px] leading-4 font-medium`}> {el.name} </p>
                                                <p className={`text-[#FFFFFF99] font-light text-[12px] leading-4`}> {el.email} </p>
                                            </div>
                                        </div>
                                        <div className={`h-full flex items-center justify-center text-sm font-semibold leading-5 text-[#ffffff]`}>
                                            <p className={`absolute left-260`}> {el.terms} </p>
                                        </div>
                                        <div className={`h-full flex items-center justify-center text-sm font-semibold leading-5 text-[#ffffff]`}>
                                            <p> {el.points} </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* Thanh thời gian và thanh điều hướng */}
                <div className={`w-full flex justify-end pr-8 py-5.5`}>
                    <div className={`w-full flex items-center gap-[204.5px]`}>
                        {/* Thanh thời gian */}
                        <div className={`text-[#FFFFFF] flex flex-1 flex-col items-center justify-between h-13.75 ml-120`}>
                            <h1 className={`font-semibold text-2xl`}> Ends in </h1>
                            <p className={`font-normal text-sm`}> 10 days 23 hours 23 seconds </p>
                        </div>
                        {/* Thanh điều hướng */}
                        <div className={`text-[#FFFFFF] w-66 h-8 flex items-center justify-between gap-4`}>
                            <div className={`flex items-center justify-center`}>
                                <ChevronLeft    className={`cursor-pointer`}
                                                onClick={() => {
                                                    setIndex(index - 2 < 0 ? numbers.length : index - 1)
                                                }}/>
                            </div>
                            <div className={`h-2.5 flex flex-1 items-center justify-between gap-1`}>
                                {/* Nhóm chứa các số 1 */}
                                <div style={{...numbersStyle}} className={`cursor-pointer`}>
                                    {
                                        numbers.slice(0,3).map(el => (
                                            <p  key={el}
                                                className={`${index === el ? "bg-[#171C29] font-semibold text-[#FFFFFF]" : ""}
                                                            w-6.75 h-8 rounded-[10px] flex items-center justify-center`}>
                                                {el}
                                            </p>
                                        ))
                                    }
                                </div>
                                <div> <p className={`text-[#FFFFFF99] cursor-default`}> ... </p> </div>
                                {/* Nhóm chứa các số 2 */}
                                <div style={{...numbersStyle}} className={`cursor-pointer`}>
                                    {
                                        numbers.slice(numbers.length - 2, numbers.length).map(el => (
                                            <p  key={el}
                                                className={`${index === el ? "bg-[#171C29] font-semibold text-[#FFFFFF]" : ""}
                                                            w-6.75 h-8 rounded-[10px] flex items-center justify-center`}>
                                                {el}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={`flex items-center justify-center`}>
                                <ChevronRight   className={`cursor-pointer`}
                                                onClick={() => {
                                                    setIndex(index + 1 > numbers.length ? 1 : index + 1)
                                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
