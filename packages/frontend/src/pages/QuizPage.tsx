import React from 'react';

const QuizPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Giao diện Quiz - Sprint 1 (FE3)
      </h1>
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <p className="text-gray-700 text-lg mb-4">Câu hỏi: Frontend là làm gì?</p>
        <div className="grid grid-cols-1 gap-3">
          <button className="py-2 px-4 bg-gray-200 rounded hover:bg-blue-200 transition">A. Làm server</button>
          <button className="py-2 px-4 bg-gray-200 rounded hover:bg-blue-200 transition">B. Làm giao diện</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;