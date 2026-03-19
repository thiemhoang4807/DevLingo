// 1. Công thức tính XP
export const calculateXP = (correctAnswers: number, totalQuestions: number, difficulty: string): number => {
  const BASE_XP = 10;
  const multipliers: Record<string, number> = { easy: 1.0, medium: 1.5, hard: 2.0 };
  const multiplier = multipliers[difficulty] || 1.0;

  // Tính điểm cơ bản
  let totalXP = (correctAnswers * BASE_XP) * multiplier;

  // Thưởng hoàn hảo (100% đúng)
  if (correctAnswers === totalQuestions && totalQuestions > 0) {
    totalXP += 50;
  }

  return Math.round(totalXP); // Làm tròn để tránh số lẻ
};

// 2. Logic thăng cấp
export const checkLevelUp = (currentXP: number): { level: number, name: string } => {
  const milestones = [
    { level: 10, minXp: 10000, name: "Legendary" },
    { level: 9, minXp: 6500, name: "Diamond" },
    { level: 8, minXp: 4000, name: "Obsidian" },
    { level: 7, minXp: 2500, name: "Pearl" },
    { level: 6, minXp: 1500, name: "Emerald" },
    { level: 5, minXp: 800, name: "Ruby" },
    { level: 4, minXp: 475, name: "Sapphire" },
    { level: 3, minXp: 250, name: "Gold" },
    { level: 2, minXp: 100, name: "Silver" },
    { level: 1, minXp: 0, name: "Bronze" }
  ];

  // Tìm mốc level cao nhất mà user đạt được
  return milestones.find(m => currentXP >= m.minXp) || milestones[milestones.length - 1];
};