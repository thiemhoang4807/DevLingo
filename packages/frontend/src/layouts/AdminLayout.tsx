import { Link, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      
      {/* 1. Sidebar (Cập nhật chuẩn Figma mới) */}
      <aside className="w-64 bg-black border-r border-gray-900 flex flex-col pt-6">
        <div className="px-6 mb-6">
          {/* Chữ Admin góc trái */}
          <p className="text-gray-300 text-sm mb-4">Admin</p>
          {/* Tiêu đề Bảng Điều Khiển căn giữa */}
          <h2 className="text-[22px] font-normal text-center text-white">
            Bảng Điều Khiển
          </h2>
        </div>

        {/* Menu Navigation */}
        <nav className="flex flex-col gap-4 px-8 mt-2">
          <Link
            to="/admin/terms"
            className={`block w-full rounded-full border border-[#0096FF] py-1.5 text-center text-[13px] font-bold transition-all ${
              isActive('/admin/terms') 
                ? "bg-[#0096FF]/20 text-white shadow-[0_0_10px_rgba(0,150,255,0.3)]" 
                : "text-white hover:bg-[#0096FF]/10"
            }`}
          >
            Terms
          </Link>

          <Link
            to="/admin/quizzes"
            className={`block w-full rounded-full border border-[#0096FF] py-1.5 text-center text-[13px] font-bold transition-all ${
              isActive('/admin/quizzes') 
                ? "bg-[#0096FF]/20 text-white shadow-[0_0_10px_rgba(0,150,255,0.3)]" 
                : "text-white hover:bg-[#0096FF]/10"
            }`}
          >
            Quiz
          </Link>

          <Link
            to="/admin/users"
            className={`block w-full rounded-full border border-[#0096FF] py-1.5 text-center text-[13px] font-bold transition-all ${
              isActive('/admin/users') 
                ? "bg-[#0096FF]/20 text-white shadow-[0_0_10px_rgba(0,150,255,0.3)]" 
                : "text-white hover:bg-[#0096FF]/10"
            }`}
          >
            User
          </Link>
        </nav>
      </aside>

      {/* 2. Main Content (Khu vực hiển thị các bảng bên phải) */}
      <main className="flex-1 flex flex-col bg-black min-h-screen">
         <div className="flex-1 p-8 overflow-y-auto">
            <Outlet /> 
         </div>
      </main>

    </div>
  );
}

export default AdminLayout;