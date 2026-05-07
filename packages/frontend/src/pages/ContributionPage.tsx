import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios'; // 🚀 Nhớ đảm bảo frontend đã cài axios (npm install axios)

export default function ContributionPage() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [topic, setTopic] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term || !definition) {
      alert("Vui lòng nhập từ vựng và định nghĩa!");
      return;
    }

    try {
      // 🚀 1. Đóng gói dữ liệu thành FormData (Bắt buộc khi có File ảnh)
      const formData = new FormData();
      formData.append("term", term);
      formData.append("definition", definition);
      formData.append("topic", topic);
      if (imageFile) {
        // Tên field "image" phải khớp với upload.single("image") bên Backend
        formData.append("image", imageFile); 
      }

      // 🚀 2. Gọi API thực tế (Đang bọc comment, sếp mở ra khi nối API)
      /*
      const token = localStorage.getItem("token"); // Hoặc lấy từ Context/Redux
      const response = await axios.post("http://localhost:5000/api/contributions", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Truyền token để biết ai đóng góp
        },
        withCredentials: true
      });
      */

      // 🚀 3. Xử lý thành công
      console.log("Dữ liệu chuẩn bị gửi:", { term, definition, topic, imageFile });
      alert("Cảm ơn bạn đã đóng góp! Nội dung đang chờ duyệt.");
      
      // Reset Form
      setTerm(''); setDefinition(''); setTopic(''); 
      setImageFile(null); setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Lỗi khi gửi đóng góp:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu lên Server!");
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-8 pt-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Đóng góp từ vựng mới</h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        
        {/* CỘT TRÁI: Nhập Thông Tin Text */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Từ vựng (Term)</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ví dụ: Polymorphism"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#333333] dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Định nghĩa (Definition)</label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Giải thích ý nghĩa..."
              rows={5}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#333333] dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Chủ đề (Topic)</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: OOP, Database..."
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#333333] dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* CỘT PHẢI: Upload Ảnh & Nút Submit */}
        <div className="w-full md:w-[350px] flex flex-col gap-6">
          <label className="block text-sm font-medium mb-2 dark:text-gray-300 opacity-0 hidden md:block">Upload</label>

          {/* Image Upload Box */}
          <div 
            onClick={handleImageClick}
            className="w-full aspect-square bg-gray-100 dark:bg-[#333333] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 overflow-hidden relative"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400 transition-colors">
                <Camera size={64} strokeWidth={1.5} />
                <span className="text-[15px]">Tải ảnh minh họa lên</span>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-[16px] py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl mt-auto"
          >
            Gửi Đóng Góp
          </button>
        </div>
      </form>
    </div>
  );
}