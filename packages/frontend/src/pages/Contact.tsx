import { useTheme } from "../context/ThemeContext";
import { Github, Facebook, Mail, MessageSquareText } from "lucide-react";

export default function Contact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Danh sách liên hệ của Team
    // Sếp nhớ thay phần 'facebook' và 'email' thật của các anh em vào nhé
    const teamContacts = [
        { 
            name: "Lê Vũ Thiêm Hoàng", 
            role: "Project Manager", 
            githubId: "thiemhoang4807",
            facebook: "https://www.facebook.com/diamond487/",
            email: "hoanglvt.4807@gmail.com",
            isLead: true 
        },
        { 
            name: "Phạm Văn Tuấn Kiệt", role: "Backend Developer", githubId: "NoFoundShadow",
            facebook: "https://facebook.com/", email: "kiet@example.com" 
        },
        { 
            name: "Dương Tuấn Ngọc", role: "Backend Developer", githubId: "tothuongcau",
            facebook: "https://facebook.com/", email: "ngoc@example.com" 
        },
        { 
            name: "Phan Đăng Trọng Tín", role: "Backend Developer", githubId: "TinPhan0602",
            facebook: "https://facebook.com/", email: "tin@example.com" 
        },
        { 
            name: "Đỗ Hoàng Anh Tú", role: "Frontend Developer", githubId: "Tus-na",
            facebook: "https://facebook.com/", email: "tu@example.com" 
        },
        { 
            name: "Hứa Nguyên Khôi", role: "Frontend Developer", githubId: "MeoMuop3727",
            facebook: "https://facebook.com/", email: "khoi@example.com" 
        },
        { 
            name: "Nguyễn Vũ Hoàng Minh", role: "Frontend Developer", githubId: "Pol-d",
            facebook: "https://facebook.com/", email: "minh@example.com" 
        },
        { 
            name: "Nguyễn Hùng Quân", role: "Frontend Developer", githubId: "Wadey727",
            facebook: "https://facebook.com/", email: "quan@example.com" 
        },
        { 
            name: "Phạm Quang Bôn", role: "UI/UX Designer", githubId: "noq-wvyd",
            facebook: "https://facebook.com/", email: "bon@example.com" 
        },
        { 
            name: "Nguyễn Tấn Dũng", role: "UI/UX Designer", githubId: "skibidi07",
            facebook: "https://facebook.com/", email: "dung@example.com" 
        }
    ];

    const leadContact = teamContacts[0];
    const memberContacts = teamContacts.slice(1);

    // Component Contact Card
    const ContactCard = ({ member }: { member: any }) => (
        <div className={`flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2
            ${isDark ? "bg-[#171C29] border border-gray-800 hover:shadow-lg hover:shadow-blue-900/20" : "bg-white border border-gray-200 shadow-sm hover:shadow-xl"}`}>
            
            <img 
                src={`https://github.com/${member.githubId}.png`} 
                alt={member.name} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name.replace(/ /g, '+')}&background=random&color=fff&size=256`;
                }}
                className={`w-28 h-28 rounded-full mb-4 shadow-md border-4 ${member.isLead ? "border-blue-500 w-32 h-32" : (isDark ? "border-[#2A2D35]" : "border-gray-50")}`}
            />
            
            <h3 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</h3>
            <p className={`font-semibold text-[14px] mb-6 uppercase tracking-wider ${member.isLead ? "text-blue-500" : "text-blue-400"}`}>
                {member.role}
            </p>
            
            {/* Đường kẻ ngang */}
            <div className={`w-full h-px mb-6 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}></div>

            {/* Các nút liên hệ */}
            <div className="flex items-center justify-center gap-3 w-full">
                <a href={`mailto:${member.email}`} 
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors group
                    ${isDark ? "bg-[#0B0D16] hover:bg-red-500/10" : "bg-gray-50 hover:bg-red-50"}`}
                    title="Send an Email">
                    <Mail size={20} className={`transition-colors ${isDark ? "text-gray-400 group-hover:text-red-400" : "text-gray-600 group-hover:text-red-500"}`} />
                </a>

                <a href={`https://github.com/${member.githubId}`} target="_blank" rel="noopener noreferrer" 
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors group
                    ${isDark ? "bg-[#0B0D16] hover:bg-gray-800" : "bg-gray-50 hover:bg-gray-200"}`}
                    title="View GitHub Profile">
                    <Github size={20} className={`transition-colors ${isDark ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-black"}`} />
                </a>

                <a href={member.facebook} target="_blank" rel="noopener noreferrer" 
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors group
                    ${isDark ? "bg-[#0B0D16] hover:bg-blue-500/10" : "bg-gray-50 hover:bg-blue-50"}`}
                    title="Connect on Facebook">
                    <Facebook size={20} className={`transition-colors ${isDark ? "text-gray-400 group-hover:text-blue-500" : "text-gray-600 group-hover:text-blue-600"}`} />
                </a>
            </div>
        </div>
    );

    return (
        <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 pb-24 ${isDark ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"}`}>
            
            {/* --- HERO SECTION --- */}
            <div className={`w-full py-20 px-6 text-center ${isDark ? "bg-[#111318] border-b border-gray-800" : "bg-white border-b border-gray-200"}`}>
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    <div className={`p-3 rounded-2xl mb-6 inline-flex ${isDark ? "bg-[#1E293B]" : "bg-blue-50"}`}>
                        <MessageSquareText className="w-10 h-10 text-blue-500" />
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Touch</span>
                    </h1>
                    <p className={`text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Have a question, feedback, or just want to say hi? Feel free to reach out to any member of our DevLingo team.
                    </p>
                </div>
            </div>

            <div className="max-w-[1184px] mx-auto px-6 mt-16">
                
                {/* --- KHU VỰC PROJECT MANAGER --- */}
                <div className="flex justify-center w-full mb-12">
                    <div className="w-full max-w-[400px]">
                        <ContactCard member={leadContact} />
                    </div>
                </div>

                {/* --- KHU VỰC CÁC THÀNH VIÊN KHÁC (Grid 3 cột) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {memberContacts.map((member, idx) => (
                        <ContactCard key={idx} member={member} />
                    ))}
                </div>

            </div>
        </div>
    );
}