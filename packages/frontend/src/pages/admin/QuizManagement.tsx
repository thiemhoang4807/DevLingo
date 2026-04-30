import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

// Dữ liệu mẫu ban đầu để test tính năng
const initialQuizzes = [
  { 
    id: 1, question: "API viết tắt của từ gì?", topic: "Web Dev", difficulty: "Dễ",
    options: [
      { id: 'A', text: 'Application Programming Interface' }, { id: 'B', text: 'Apple Programming Interface' },
      { id: 'C', text: 'Android Programming Interface' }, { id: 'D', text: 'Automated Programming Interface' }
    ], correctAnswer: 'A'
  }, 
  { 
    id: 2, question: "Thẻ <a> trong HTML dùng làm gì?", topic: "Frontend", difficulty: "Dễ",
    options: [
      { id: 'A', text: 'Tạo bảng' }, { id: 'B', text: 'Tạo liên kết (Link)' },
      { id: 'C', text: 'Chèn ảnh' }, { id: 'D', text: 'In đậm chữ' }
    ], correctAnswer: 'B'
  }
];

function QuizManagement() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);

  // States cho Form (Dùng cho cả Create & Edit)
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizContent, setQuizContent] = useState('');
  const [options, setOptions] = useState([
    { id: 'A', text: '' }, { id: 'B', text: '' },
    { id: 'C', text: '' }, { id: 'D', text: '' }
  ]);
  const [correctAnswer, setCorrectAnswer] = useState('A'); 

  // States quản lý Xóa (Giống hệt phần Terms)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<{ id: number, question: string } | null>(null);

  // --- HÀM XỬ LÝ FORM ---
  const handleOptionChange = (id: string, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleOpenCreateForm = () => {
    setTopic(''); setDifficulty(''); setQuizContent('');
    setOptions([{ id: 'A', text: '' }, { id: 'B', text: '' }, { id: 'C', text: '' }, { id: 'D', text: '' }]);
    setCorrectAnswer('A');
    setEditingQuizId(null);
    setCurrentView('form');
  };

  const handleOpenEditForm = (quiz: any) => {
    setTopic(quiz.topic);
    setDifficulty(quiz.difficulty);
    setQuizContent(quiz.question);
    setOptions(quiz.options);
    setCorrectAnswer(quiz.correctAnswer);
    setEditingQuizId(quiz.id);
    setCurrentView('form');
  };

  const handleSaveQuiz = () => {
    if (quizContent.trim() === '') {
      alert("Vui lòng nhập nội dung câu hỏi!"); return;
    }

    const quizData = {
      id: editingQuizId || Date.now(),
      question: quizContent,
      topic: topic || "Chưa phân loại",
      difficulty: difficulty || "Chưa rõ",
      options: options,
      correctAnswer: correctAnswer
    };

    if (editingQuizId) {
      setQuizzes(quizzes.map(q => q.id === editingQuizId ? quizData : q));
    } else {
      setQuizzes([quizData, ...quizzes]);
    }
    setCurrentView('list');
  };

  // --- HÀM XỬ LÝ XÓA (Delete Logic) ---
  const handleDeleteClick = (quiz: any) => {
    setQuizToDelete(quiz);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (quizToDelete) {
      setQuizzes(quizzes.filter(q => q.id !== quizToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  // ==========================================
  // GIAO DIỆN FORM (CREATE / EDIT)
  // ==========================================
  if (currentView === 'form') {
    return (
      <div className="max-w-5xl mx-auto pt-4 pb-12">
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-white text-sm mb-2 font-medium">Topic</label>
            <input 
              type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#e5e5e5] text-black p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/4 min-w-[150px]">
            <label className="block text-white text-sm mb-2 font-medium">Difficulty</label>
            <input 
              type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-[#e5e5e5] text-black p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-white text-sm mb-2 font-medium">Quiz</label>
          <textarea 
            value={quizContent} onChange={(e) => setQuizContent(e.target.value)}
            className="w-full h-48 bg-[#333333] text-white p-4 rounded-md outline-none resize-none border border-gray-700 focus:border-gray-500 transition-colors"
          />
        </div>

        <div className="space-y-4 mb-8">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#333333] text-white font-bold text-lg rounded-md border border-gray-700">
                {opt.id}
              </div>
              <input 
                type="text" value={opt.text} onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                className="flex-1 h-12 bg-[#333333] text-white px-4 rounded-md outline-none border border-gray-700 focus:border-gray-500 transition-colors"
              />
              <div className="w-12 flex justify-center">
                <input 
                  type="radio" name="correctAnswer"
                  checked={correctAnswer === opt.id}
                  onChange={() => setCorrectAnswer(opt.id)}
                  className="w-5 h-5 cursor-pointer accent-[#e5e5e5]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSaveQuiz} className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-3 rounded-md font-bold transition-colors">
            {editingQuizId ? "Cập nhật" : "Submit"}
          </button>
          <button onClick={() => setCurrentView('list')} className="text-gray-400 hover:text-white px-4 py-3 transition-colors font-medium">
            Hủy bỏ
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // GIAO DIỆN DANH SÁCH (LIST)
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto pt-4 px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-white uppercase tracking-wide">
          Quản Lý Câu Hỏi
        </h2>
      </div>

      <p className="text-gray-400 mb-4 text-sm">Tổng cộng: {quizzes.length} câu hỏi</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
        {quizzes.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-[#e5e5e5] px-4 py-2.5 rounded-sm hover:bg-white transition-colors group">
            <div className="font-bold text-black text-[16px] truncate pr-4">
              {item.question}
            </div>
            
            <div className="flex items-center gap-3 text-gray-800 shrink-0">
              {/* Nút Xóa */}
              <button onClick={() => handleDeleteClick(item)} className="hover:text-red-600 transition-colors" title="Xóa">
                <Trash2 className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
              {/* Nút Sửa */}
              <button onClick={() => handleOpenEditForm(item)} className="hover:text-blue-600 transition-colors" title="Sửa">
                <Pencil className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button onClick={handleOpenCreateForm} className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-bold transition-colors text-[14px]">
          Create new quiz
        </button>
      </div>

      {/* ==========================================
          MODAL XÁC NHẬN XÓA (Giống hệt bên Terms)
      ========================================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-[#5c5c5c] w-[350px] shadow-2xl flex flex-col rounded-sm overflow-hidden">
            
            {/* Header Modal */}
            <div className="bg-[#d9d9d9] py-3 text-center">
              <h3 className="text-black text-[22px] font-medium">Cảnh báo</h3>
            </div>
            
            {/* Body Modal */}
            <div className="py-10 text-center px-6">
              <p className="text-white text-[20px] mb-2">Bạn muốn xoá câu hỏi này?</p>
              <p className="text-gray-300 text-[13px] truncate italic">"{quizToDelete?.question}"</p>
            </div>
            
            {/* Footer Modal (Buttons) */}
            <div className="flex justify-center gap-8 pb-8">
              <button onClick={confirmDelete} className="bg-[#d9d9d9] text-black text-[18px] px-8 py-1.5 hover:bg-white transition-colors">
                Có
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-[#d9d9d9] text-black text-[18px] px-6 py-1.5 hover:bg-white transition-colors">
                Không
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default QuizManagement;