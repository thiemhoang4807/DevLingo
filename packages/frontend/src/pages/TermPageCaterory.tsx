export default function TermPageCategory() {
    const categoriesList: string[] = ["Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1", "Terms 1"];
    
    // Đã thay w-[280px] thành w-full, thêm hover cho xịn
    const categoriesList_li = categoriesList.map((el, index) => (
        <li key={index} className="category_items cursor-pointer list-none w-full h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] transition-colors font-[600] text-[17px] leading-[32px] text-[#FFFFFF]">
            {el}
        </li>
    ));

    const alphabetList: string[] = ["#", "A", "B", "C", "D", "E", "F", "G", "H",
                                "I", "J", "K", "L", "M", "N", "O", "P", "Q",
                                "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                                
    // Đã thay w-[118px] thành w-full, thêm hover
    const alphabetList_li = alphabetList.map(el => (
        <li key={el} className="alphabet_items cursor-pointer list-none w-full h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] transition-colors font-[600] text-[17px] leading-[32px] text-[#FFFFFF]">
            {el}
        </li>
    ));

    return (
        <div className="inter container flex flex-col items-center justify-start gap-[50px] w-full">
            <div className="container__categories flex flex-col gap-[16px] w-full">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Categories
                </h2>
                {/* Đổi inline-grid thành grid, tăng gap lên 16px cho thoáng */}
                <div className="w-full grid grid-cols-4 gap-[16px]">
                    {categoriesList_li}
                </div>
            </div>

            <div className="container__alphabet flex flex-col gap-[16px] w-full mt-4">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Alphabet
                </h2>
                {/* Đổi inline-grid thành grid, gap 12px */}
                <div className="w-full grid grid-cols-9 gap-[12px]">
                    {alphabetList_li}
                </div>
            </div>
        </div>
    );
}