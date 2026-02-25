import React, { useEffect, useState } from 'react';
import { User, ApiResponse } from '@devlingo/shared';

export const App: React.FC = () => {
  // Báo cho React biết state này sẽ chứa object chuẩn khuôn User
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Loading backend data...");

  useEffect(() => {
    const fetchHealthData = async (): Promise<void> => {
      try {
        // Nhờ Proxy của Vite, ta chỉ cần gọi '/api/health' thay vì 'http://localhost:5000/...'
        const response = await fetch('/api/health');
        
        // Ép kiểu dữ liệu trả về theo chuẩn ApiResponse<User>
        const result: ApiResponse<User> = await response.json();

        if (result.success && result.data) {
          setCurrentUser(result.data);
          setStatusMessage(result.message);
        }
      } catch (error) {
        setStatusMessage("Failed to connect to backend!");
        console.error("Fetch error:", error);
      }
    };

    fetchHealthData();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb' }}>DevLingo: Frontend App</h1>
      
      <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '2px solid #bbf7d0' }}>
        <h3 style={{ color: '#166534', marginTop: 0 }}>System Status: {statusMessage}</h3>
        
        {currentUser && (
          <ul style={{ fontSize: '18px', lineHeight: '1.6', color: '#374151' }}>
            <li><strong>Username:</strong> {currentUser.username}</li>
            <li><strong>Full Name:</strong> {currentUser.fullName}</li>
            <li><strong>Role:</strong> {currentUser.role}</li>
            <li><strong>Level:</strong> {currentUser.level}</li>
            <li><strong>Total XP:</strong> <span style={{ color: '#ea580c', fontWeight: 'bold' }}>{currentUser.xp} XP</span></li>
          </ul>
        )}
      </div>
    </div>
  );
};