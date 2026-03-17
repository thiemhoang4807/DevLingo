export const saveBadgeToDb = async (badgeData: { title: string, description: string, imageUrl: string }) => {
  // Thay đoạn này bằng logic DB thực tế của team bạn
  // return await prisma.badge.create({ data: badgeData });

  console.log("Đã lưu vào DB:", badgeData);
  return { id: "new-uuid", ...badgeData };
};