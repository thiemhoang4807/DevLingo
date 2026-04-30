import { useTheme } from "../context/ThemeContext";
import { Target, Zap, Users, Github, Code2, Rocket, Heart } from "lucide-react";

export default function AboutUs() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const missions = [
        {
            icon: <Target className="w-6 h-6 text-blue-500" />,
            title: "Clear Objectives",
            description: "Transforming the dry process of learning IT terminology into a fun, engaging gamified experience."
        },
        {
            icon: <Zap className="w-6 h-6 text-yellow-500" />,
            title: "Accelerated Learning",
            description: "Integrating Spaced Repetition algorithms and practical quizzes to ensure long-term memory retention."
        },
        {
            icon: <Users className="w-6 h-6 text-purple-500" />,
            title: "Growing Community",
            description: "Fostering a competitive yet collaborative environment with leaderboards to learn and grow together."
        }
    ];

    const allMembers = [
        { name: "Lê Vũ Thiêm Hoàng", role: "Project Manager", githubId: "thiemhoang4807", isLead: true },
        { name: "Phạm Văn Tuấn Kiệt", role: "Backend Developer", githubId: "NoFoundShadow" },
        { name: "Dương Tuấn Ngọc", role: "Backend Developer", githubId: "tothuongcau" },
        { name: "Phan Đăng Trọng Tín", role: "Backend Developer", githubId: "TinPhan0602" },
        { name: "Đỗ Hoàng Anh Tú", role: "Frontend Developer", githubId: "Tus-na" },
        { name: "Hứa Nguyên Khôi", role: "Frontend Developer", githubId: "MeoMuop3727" }, 
        { name: "Nguyễn Vũ Hoàng Minh", role: "Frontend Developer", githubId: "Pol-d" },
        { name: "Nguyễn Hùng Quân", role: "Frontend Developer", githubId: "Wadey727" },
        { name: "Phạm Quang Bôn", role: "UI/UX Designer", githubId: "noq-wvyd" },
        { name: "Nguyễn Tấn Dũng", role: "UI/UX Designer", githubId: "skibidi07" }
    ];

    const MemberCard = ({ member, isLead = false }: { member: any, isLead?: boolean }) => (
        <div className={`flex flex-col items-center text-center p-8 rounded-3xl transition-colors
            ${isDark ? "bg-[#171C29] border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
            
            <img 
                src={`https://github.com/${member.githubId}.png`} 
                alt={member.name} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name.replace(/ /g, '+')}&background=random&color=fff&size=256`;
                }}
                className={`w-28 h-28 rounded-full mb-5 shadow-md border-4 ${isLead ? "border-blue-500" : (isDark ? "border-[#2A2D35]" : "border-gray-50")}`}
            />
            
            <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</h3>
            <p className={`font-semibold text-[13px] mb-5 uppercase tracking-wider ${isLead ? "text-blue-500" : "text-blue-400"}`}>{member.role}</p>
            
            <div className="flex items-center gap-4 mt-auto">
                <a href={`https://github.com/${member.githubId}`} target="_blank" rel="noopener noreferrer" 
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium text-[13px]
                    ${isDark ? "bg-[#0B0D16] text-gray-300 hover:text-white" : "bg-gray-100 text-gray-700 hover:text-black"}`}>
                    <Github size={16} />
                    <span>@{member.githubId}</span>
                </a>
            </div>
        </div>
    );

    return (
        <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 pb-20 ${isDark ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"}`}>
            <div className="max-w-[1300px] mx-auto px-6 pt-24 lg:flex lg:gap-16 items-start">
                
                {/* --- CỘT TRÁI: GIỚI THIỆU & GIÁ TRỊ CỐT LÕI --- */}
                <div className="lg:w-5/12 lg:sticky lg:top-24 flex flex-col gap-12 mb-20 lg:mb-0">
                    
                    {/* Hero Text */}
                    <div className="flex flex-col items-start">
                        <div className={`p-3 rounded-2xl mb-6 inline-flex ${isDark ? "bg-[#1E293B]" : "bg-blue-50"}`}>
                            <Code2 className="w-8 h-8 text-blue-500" />
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            About <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">DevLingo</span>
                        </h1>
                        
                        <div className={`text-[15px] leading-relaxed flex flex-col gap-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            <p>
                                Developed as a final project by students at the <strong>University of Information Technology, VNU-HCM (UIT)</strong>, DevLingo was born from a simple idea: mastering computer science terminology shouldn't be a barrier.
                            </p>
                            <p>
                                Our mission is to simplify complex tech jargon by turning dry definitions into engaging, gamified challenges. Whether you are a freshman or a seasoned developer, we want to make your learning journey as fun as playing a game.
                            </p>
                            <div className={`p-4 mt-2 rounded-xl flex items-start gap-3 ${isDark ? "bg-[#171C29] border border-gray-800" : "bg-blue-50 border border-blue-100"}`}>
                                <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-[14px]">
                                    <strong>Special Shoutout:</strong> This project was heavily inspired by the incredible work at <a href="https://techterms.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">TechTerms.com</a>. We deeply appreciate their contribution to the global tech community!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Missions */}
                    <div className="flex flex-col gap-6">
                        <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Core Values</h2>
                        {missions.map((mission, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl transition-colors
                                ${isDark ? "bg-[#171C29] border border-gray-800" : "bg-white border border-gray-100 shadow-sm"}`}>
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? "bg-[#0B0D16]" : "bg-gray-50"}`}>
                                        {mission.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{mission.title}</h3>
                                        <p className={`leading-relaxed text-[14px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{mission.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- CỘT PHẢI: DANH SÁCH TEAM --- */}
                <div className="lg:w-7/12 flex flex-col w-full">
                    
                    <div className="flex items-center gap-2 mb-8">
                        <Rocket className="w-6 h-6 text-blue-500" />
                        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Meet The Team</h2>
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {allMembers.map((member, idx) => (
                                <MemberCard key={idx} member={member} isLead={member.isLead} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}