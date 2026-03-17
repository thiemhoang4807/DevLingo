export default function TermPageCategorySpecializedLetter() {
    const termList: string[] = []; 
    for (let i = 0; i < 46; i++) { termList[i] = "TERMS"; }
    
    const termList_li = termList.map((el, index) => (
        <li key={index} className="list-none bg-[#E8E7E7] dark:bg-[#4A4A4A] rounded-[6px] border border-[#B9B8B8] dark:border-[#777676] flex flex-row gap-[16px] items-center p-[16px] h-[66px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="icon w-[32px] h-[32px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[#B1B1B1] to-[#FFFFFF] dark:to-[#4B4B4B]">
                <p className="cursor-default font-bold text-[14px] text-[#000000] dark:text-[#FFFFFF] leading-[20px]">
                    A
                </p>
            </div>

            <div className="content flex-1 text-left">
                <p className="font-[400] text-[16px] text-[#000000] dark:text-[#FFFEFE] leading-[24px]">
                    {el}
                </p>
            </div>
        </li>
    ));

    return (
        <div className="inter container flex flex-col gap-[50px] w-full">
            <div className="container__titile">
                <h2 className="font-bold text-[30px] text-[#000000] dark:text-[#E5E7EB] text-left leading-[32px]">
                    Terms that start with 'A'
                </h2>
            </div>

            <div className="container__list flex flex-col gap-[10px] w-full">
                {termList_li}
            </div>
        </div>
    );
}