import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

// Dữ liệu mẫu User (Bao gồm thông tin học tập và Huy hiệu)
const initialUsers = [
  { id: 1, username: "nguyen_dev99", totalLearned: 1250, streak: 14, level: 12, rank: "Gold", badge: "Gold III" },
  { id: 2, username: "frontend_master", totalLearned: 3420, streak: 45, level: 30, rank: "Diamond", badge: "Diamond I" },
  { id: 3, username: "newbie_coder", totalLearned: 50, streak: 2, level: 1, rank: "Bronze", badge: "Bronze I" },
  { id: 4, username: "hacker_lord", totalLearned: 9999, streak: 365, level: 99, rank: "Grandmaster", badge: "Grandmaster" },
];

// Danh sách các Huy hiệu mô phỏng theo ảnh thiết kế của bạn
const BADGE_OPTIONS = [
  "Bronze I", "Bronze II", "Bronze III",
  "Silver I", "Silver II", "Silver III",
  "Gold I", "Gold II", "Gold III",
  "Platinum I", "Platinum II", "Platinum III",
  "Diamond I", "Diamond II", "Diamond III",
  "Master", "Grandmaster", "Challenger"
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  
  // States cho Form Chỉnh sửa
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [totalLearned, setTotalLearned] = useState<number | string>('');
  const [streak, setStreak] = useState<number | string>('');
  const [level, setLevel] = useState<number | string>('');
  const [rank, setRank] = useState('');
  const [badge, setBadge] = useState('');

  // States quản lý Xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: number, username: string } | null>(null);

  // --- HÀM XỬ LÝ FORM ---
  const handleOpenEditForm = (user: any) => {
    setEditingUserId(user.id);
    setUsername(user.username);
    setTotalLearned(user.totalLearned);
    setStreak(user.streak);
    setLevel(user.level);
    setRank(user.rank);
    setBadge(user.badge);
    setCurrentView('edit');
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map(u => 
      u.id === editingUserId 
        ? { 
            ...u, 
            username, 
            totalLearned: Number(totalLearned), 
            streak: Number(streak), 
            level: Number(level), 
            rank, 
            badge 
          } 
        : u
    );
    setUsers(updatedUsers);
    setCurrentView('list');
  };

  // --- HÀM XỬ LÝ XÓA ---
  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      // Nếu đang ở màn hình edit mà bấm xóa thì quay về list luôn
      if (currentView === 'edit') setCurrentView('list'); 
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // ==========================================
  // GIAO DIỆN 1: MÀN HÌNH CHỈNH SỬA / CẤP HUY HIỆU
  // ==========================================
  if (currentView === 'edit') {
    return (
      <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
        
        {/* Username */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-2 font-medium">Username</label>
          <input 
            type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent"
          />
        </div>

        {/* Total Learned & Streak (Tỷ lệ 2/3 và 1/3) */}
        <div className="flex gap-6 mb-6">
          <div className="flex-[2]">
            <label className="block text-white text-sm mb-2 font-medium">Total Learned</label>
            <input 
              type="number" value={totalLearned} onChange={(e) => setTotalLearned(e.target.value)}
              className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent"
            />
          </div>
          <div className="flex-[1]">
            <label className="block text-white text-sm mb-2 font-medium">Streak</label>
            <input 
              type="number" value={streak} onChange={(e) => setStreak(e.target.value)}
              className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent"
            />
          </div>
        </div>

        {/* Level & Rank (Tỷ lệ 1/3 và 2/3) */}
        <div className="flex gap-6 mb-6">
          <div className="flex-[1]">
            <label className="block text-white text-sm mb-2 font-medium">Level</label>
            <input 
              type="number" value={level} onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent"
            />
          </div>
          <div className="flex-[2]">
            <label className="block text-white text-sm mb-2 font-medium">Rank</label>
            <input 
              type="text" value={rank} onChange={(e) => setRank(e.target.value)}
              className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent"
            />
          </div>
        </div>

        {/* Badge (Cấp phát huy hiệu) */}
        <div className="mb-8">
          <label className="block text-white text-sm mb-2 font-medium">Badge</label>
          <select 
            value={badge} onChange={(e) => setBadge(e.target.value)}
            className="w-full bg-[#333333] text-white p-3.5 rounded-md outline-none focus:ring-1 focus:ring-gray-500 border border-transparent cursor-pointer appearance-none"
          >
            <option value="" disabled>-- Chọn huy hiệu để cấp phát --</option>
            {BADGE_OPTIONS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {/* Mẹo: Sau này bạn cắt ảnh Badges.png ra thành từng file nhỏ, có thể hiển thị ảnh badge đã chọn ở ngay dưới thẻ select này */}
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-4">
          <button onClick={handleUpdateUser} className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-2.5 rounded-md font-bold transition-colors">
            Update
          </button>
          
          <button 
            onClick={() => handleDeleteClick({ id: editingUserId, username })} 
            className="bg-[#3B82F6] hover:bg-red-600 text-white px-8 py-2.5 rounded-md font-bold transition-colors"
          >
            Delete
          </button>

          <button onClick={() => setCurrentView('list')} className="text-gray-400 hover:text-white px-4 py-2.5 transition-colors font-medium ml-2">
            Hủy bỏ
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // GIAO DIỆN 2: MÀN HÌNH DANH SÁCH USER
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto pt-4 px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-white uppercase tracking-wide">
          Quản Lý Người Dùng
        </h2>
      </div>

      <p className="text-gray-400 mb-4 text-sm">Tổng cộng: {users.length} tài khoản</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
        {users.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-[#e5e5e5] px-4 py-2.5 rounded-sm hover:bg-white transition-colors group">
            
            <div className="flex items-center gap-3">
               <div className="font-bold text-black text-[16px] truncate">
                 {item.username}
               </div>
               {/* Badge nhỏ hiển thị kế bên tên */}
               <span className="text-[11px] bg-yellow-500/20 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
               </span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-800 shrink-0">
              <button onClick={() => handleDeleteClick(item)} className="hover:text-red-600 transition-colors" title="Xóa">
                <Trash2 className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
              <button onClick={() => handleOpenEditForm(item)} className="hover:text-blue-600 transition-colors" title="Sửa/Cấp Huy Hiệu">
                <Pencil className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL XÁC NHẬN XÓA */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-[#5c5c5c] w-[350px] shadow-2xl flex flex-col rounded-sm overflow-hidden">
            <div className="bg-[#d9d9d9] py-3 text-center">
              <h3 className="text-black text-[22px] font-medium">Cảnh báo</h3>
            </div>
            <div className="py-10 text-center px-6">
              <p className="text-white text-[20px] mb-2">Bạn muốn xoá User này?</p>
              <p className="text-red-400 font-bold text-[16px] truncate w-full px-4 text-center">@{userToDelete?.username}</p>
            </div>
            <div className="flex justify-center gap-8 pb-8">
              <button onClick={confirmDelete} className="bg-[#d9d9d9] text-black text-[18px] px-8 py-1.5 hover:bg-white transition-colors">Có</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-[#d9d9d9] text-black text-[18px] px-6 py-1.5 hover:bg-white transition-colors">Không</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserManagement;