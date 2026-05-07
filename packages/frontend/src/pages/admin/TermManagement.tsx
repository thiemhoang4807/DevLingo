import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

// Đã thêm trường 'description' để lưu nội dung chi tiết
const initialTerms = [
  { id: 1, term: "API", description: "Application Programming Interface là phương thức giao tiếp giữa các phần mềm." }, 
  { id: 2, term: "Kubernetes", description: "Hệ thống điều phối container mã nguồn mở." },
  { id: 3, term: "Docker", description: "Nền tảng đóng gói và chạy ứng dụng trong container." }, 
  { id: 4, term: "React", description: "Thư viện JavaScript để xây dựng giao diện người dùng." },
  { id: 5, term: "Tailwind CSS", description: "Framework CSS tiện ích giúp code UI nhanh chóng." }, 
  { id: 6, term: "TypeScript", description: "Phiên bản nâng cấp của JavaScript có thêm kiểu dữ liệu." },
];

function TermManagement() {
  const [terms, setTerms] = useState(initialTerms);
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list');

  // ==========================================
  // STATES QUẢN LÝ THÊM MỚI (CREATE)
  // ==========================================
  const [newTermName, setNewTermName] = useState('');
  const [newTermDesc, setNewTermDesc] = useState('');

  // ==========================================
  // STATES QUẢN LÝ XÓA (DELETE)
  // ==========================================
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [termToDelete, setTermToDelete] = useState<{ id: number, term: string } | null>(null);

  // ==========================================
  // STATES QUẢN LÝ CHỈNH SỬA (EDIT) - TÍNH NĂNG MỚI
  // ==========================================
  const [editingTerm, setEditingTerm] = useState<{ id: number, term: string, description: string } | null>(null);
  const [editTermName, setEditTermName] = useState('');
  const [editTermDesc, setEditTermDesc] = useState('');

  // --- HÀM XỬ LÝ THÊM MỚI ---
  const handleSaveTerm = () => {
    if (newTermName.trim() === '') {
      alert("Vui lòng nhập tên từ vựng!");
      return;
    }
    const newTerm = {
      id: Date.now(),
      term: newTermName.trim(),
      description: newTermDesc.trim()
    };
    setTerms([newTerm, ...terms]);
    setNewTermName('');
    setNewTermDesc('');
    setCurrentView('list');
  };

  // --- HÀM XỬ LÝ XÓA ---
  const handleDeleteClick = (item: { id: number, term: string }) => {
    setTermToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (termToDelete) {
      setTerms(terms.filter(t => t.id !== termToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setTermToDelete(null);
  };

  // --- HÀM XỬ LÝ CHỈNH SỬA (EDIT) ---
  const handleEditClick = (item: { id: number, term: string, description: string }) => {
    setEditingTerm(item);
    setEditTermName(item.term);
    setEditTermDesc(item.description || ''); // Lấy dữ liệu cũ đổ vào form
  };

  const handleSaveEdit = () => {
    if (editTermName.trim() === '') {
      alert("Tên từ vựng không được để trống!");
      return;
    }

    // Cập nhật lại mảng terms với dữ liệu mới
    const updatedTerms = terms.map(t => 
      t.id === editingTerm?.id 
        ? { ...t, term: editTermName, description: editTermDesc } 
        : t
    );
    
    setTerms(updatedTerms);
    setEditingTerm(null); // Đóng modal edit
  };


  // ==========================================
  // GIAO DIỆN 1: MÀN HÌNH THÊM TỪ VỰNG (CREATE)
  // ==========================================
  if (currentView === 'create') {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[80vh]">
        <div className="bg-[#3a3a3a] w-full max-w-4xl h-[60vh] flex flex-col items-center justify-center p-10 rounded-sm relative">
          <button 
            onClick={() => {
              setCurrentView('list');
              setNewTermName('');
              setNewTermDesc('');
            }}
            className="absolute top-6 right-8 text-gray-400 hover:text-white transition-colors"
          >
            ✕ Hủy
          </button>
          <h2 className="text-white text-[24px] font-medium mb-12">Thêm Từ Vựng</h2>
          <input 
            type="text" 
            placeholder="Nhập tên từ vựng..." 
            value={newTermName}
            onChange={(e) => setNewTermName(e.target.value)}
            className="bg-transparent border-b border-gray-500 text-white text-center text-lg w-64 pb-2 mb-10 outline-none focus:border-[#0096FF] transition-colors placeholder:text-gray-500"
          />
          <p className="text-gray-300 text-[15px] mb-4">Thêm mô tả</p>
          <textarea 
            placeholder="Mô tả chi tiết ý nghĩa của từ vựng này..."
            value={newTermDesc}
            onChange={(e) => setNewTermDesc(e.target.value)}
            className="bg-transparent text-gray-400 text-center w-3/4 h-32 outline-none resize-none focus:text-white transition-colors placeholder:text-gray-500/50"
          />
          <button 
            onClick={handleSaveTerm}
            className="mt-8 border border-gray-500 text-gray-300 px-10 py-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Lưu Từ Vựng
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // GIAO DIỆN 2: MÀN HÌNH DANH SÁCH (LIST) & MODALS
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto pt-4 px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-white uppercase tracking-wide">
          Quản Lý Từ Vựng
        </h2>
      </div>

      <p className="text-gray-400 mb-4 text-sm">Tổng cộng: {terms.length} từ vựng</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
        {terms.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between bg-[#e5e5e5] px-4 py-2.5 rounded-sm hover:bg-white transition-colors"
          >
            <div className="font-bold text-black text-[16px]">
              {item.term}
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <button onClick={() => handleDeleteClick(item)} className="hover:text-red-600 transition-colors" title="Xóa">
                <Trash2 className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
              {/* Nút Sửa (Cây bút) - Gọi hàm handleEditClick */}
              <button onClick={() => handleEditClick(item)} className="hover:text-blue-600 transition-colors" title="Sửa">
                <Pencil className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button 
          onClick={() => setCurrentView('create')}
          className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-bold transition-colors text-[14px]"
        >
          Create new term
        </button>
      </div>

      {/* ==========================================
          MODAL: CHỈNH SỬA TỪ VỰNG (EDIT)
      ========================================== */}
      {editingTerm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[600px] flex flex-col rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Nửa trên: Tên từ vựng (Xám nhạt) */}
            <div className="bg-[#d8d8d8] p-10 flex justify-center border-b border-gray-400">
               <input 
                  type="text"
                  value={editTermName}
                  onChange={(e) => setEditTermName(e.target.value)}
                  className="bg-transparent text-black text-center text-4xl font-bold outline-none w-full border-b-2 border-transparent focus:border-gray-500 transition-colors placeholder:text-gray-500"
                  placeholder="Tên thuật ngữ"
               />
            </div>
            
            {/* Nửa dưới: Nội dung (Xám đậm) */}
            <div className="bg-[#7a7a7a] p-8 flex flex-col gap-4">
               <h3 className="text-white text-2xl font-medium">Nội dung</h3>
               <textarea 
                  value={editTermDesc}
                  onChange={(e) => setEditTermDesc(e.target.value)}
                  className="bg-transparent text-gray-200 text-lg h-40 outline-none resize-none w-full border border-transparent focus:border-gray-500/50 rounded-md p-2 transition-colors placeholder:text-gray-400"
                  placeholder="Mô tả thay đổi..."
               />
               
               {/* Các nút hành động */}
               <div className="flex justify-end gap-4 mt-6">
                  <button 
                    onClick={() => setEditingTerm(null)} // Tắt Modal
                    className="px-8 py-2.5 bg-[#d8d8d8] text-black font-medium rounded-md hover:bg-white transition-colors"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={handleSaveEdit} // Lưu dữ liệu
                    className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Lưu thay đổi
                  </button>
               </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: XÓA (DELETE)
      ========================================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#5c5c5c] w-[350px] shadow-2xl flex flex-col rounded-sm overflow-hidden">
            <div className="bg-[#d9d9d9] py-3 text-center">
              <h3 className="text-black text-[22px] font-medium">Cảnh báo</h3>
            </div>
            <div className="py-10 text-center px-4">
              <p className="text-white text-[20px]">Bạn muốn xoá {termToDelete?.term}?</p>
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

export default TermManagement;