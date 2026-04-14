import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

function ContributionPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term || !definition) {
      alert("Vui lòng nhập từ vựng và định nghĩa!");
      return;
    }
    console.log({ term, definition, topic, imageFile });
    alert("Cảm ơn bạn đã đóng góp! Nội dung đang chờ duyệt.");
    setTerm(''); setDefinition(''); setTopic(''); 
    setImageFile(null); setImagePreview(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        
        {/* =========================================
            CỘT TRÁI: NHẬP THÔNG TIN (Term, Def, Topic)
        ========================================== */}
        <div className="flex-1 space-y-6">
          
          {/* Term Input */}
          <div>
            <label className="block text-gray-800 dark:text-white text-[15px] font-medium mb-2 transition-colors">Term</label>
            <input 
              type="text" 
              placeholder="DevLingo"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#333333] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 rounded-md outline-none border border-transparent focus:border-blue-500 dark:focus:border-gray-500 transition-colors"
            />
          </div>

          {/* Definition Textarea */}
          <div>
            <label className="block text-gray-800 dark:text-white text-[15px] font-medium mb-2 transition-colors">Definition</label>
            <textarea 
              placeholder="Definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full h-48 bg-gray-100 dark:bg-[#333333] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 rounded-md outline-none resize-none border border-transparent focus:border-blue-500 dark:focus:border-gray-500 transition-colors"
            />
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-gray-800 dark:text-white text-[15px] font-medium mb-2 transition-colors">Topic</label>
            <input 
              type="text" 
              placeholder="Topic 1"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#333333] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 rounded-md outline-none border border-transparent focus:border-blue-500 dark:focus:border-gray-500 transition-colors"
            />
          </div>

        </div>

        {/* =========================================
            CỘT PHẢI: UPLOAD ẢNH & SUBMIT BUTTON
        ========================================== */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 pt-7">
          
          {/* Image Upload Box */}
          <div 
            onClick={handleImageClick}
            className="w-full aspect-square bg-gray-100 dark:bg-[#333333] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors border-2 border-transparent hover:border-blue-500 dark:hover:border-gray-500 overflow-hidden relative"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400 transition-colors">
                <Camera size={64} strokeWidth={1.5} />
                <span className="text-[15px]">Insert picture here</span>
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
            className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-[16px] py-4 rounded-md transition-colors shadow-sm"
          >
            Submit
          </button>
          
        </div>

      </form>
    </div>
  );
}

export default ContributionPage;