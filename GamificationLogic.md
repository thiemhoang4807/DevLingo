# 🎮 DevLingo Gamification Design Document (GDD)

Tài liệu này định nghĩa toàn bộ logic về hệ thống Game của DevLingo, bao gồm cách tính điểm kinh nghiệm (XP), hệ thống thăng cấp (Level) và điều kiện mở khóa huy hiệu (Badge) để giữ chân người dùng.

## 1. 📈 Công thức tính Kinh Nghiệm (XP Formula)

Hệ thống không cộng điểm cố định để tránh nhàm chán và hạn chế lạm dụng (cày bài dễ). Điểm XP nhận được phụ thuộc vào **Độ khó của bài học** và **Độ chính xác** khi làm bài.

### Công thức tổng quát:
$$\text{Total XP} = (\text{Base XP} \times \text{Difficulty Multiplier}) + \text{Perfect Bonus}$$

### Chi tiết các biến số:
* **Base XP (Điểm cơ bản):** Mỗi câu trả lời đúng mặc định được **10 XP**.
* **Difficulty Multiplier (Hệ số độ khó):**
  * Easy (Dễ): 1.0
  * Medium (Vừa): 1.5
  * Hard (Khó): 2.0
* **Perfect Bonus (Thưởng hoàn hảo):** Cộng thêm **50 XP** nếu người dùng trả lời đúng 100% số câu hỏi trong bài Quiz.

> **Ví dụ thực tế:** Người dùng hoàn thành một bài Quiz mức *Hard* gồm 5 câu, trả lời đúng cả 5 câu.
> Tổng điểm = (50 XP * 2.0) + 50 Bonus = 150 XP.

---

## 2. 🪜 Hệ thống Cấp bậc (DevLingo Rank System)

Để tạo động lực cày cuốc, lượng XP cần thiết để thăng cấp sẽ tăng dần theo hàm số mũ. Những mốc đầu rất dễ đạt để tạo cảm hứng, nhưng càng về sau (từ hạng Emerald) độ khó sẽ càng giãn cách để giữ chân người dùng lâu dài.

| Cấp độ (Level) | Danh hiệu | Tổng XP Tích lũy | Số điểm cần để lên cấp (Khoảng cách) | Cột mốc / Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| Level 1 | Bronze | 0 XP | - | Mặc định khi tạo tài khoản |
| Level 2 | Silver | 100 XP | Cần thêm 100 XP | Vượt qua bài kiểm tra "tân binh" |
| Level 3 | Gold | 250 XP | Cần thêm 150 XP | |
| Level 4 | Sapphire | 475 XP | Cần thêm 225 XP | |
| Level 5 | Ruby | 800 XP | Cần thêm 325 XP | Kết thúc giai đoạn dễ |
| Level 6 | Emerald | 1,500 XP | Cần thêm 700 XP | Bắt đầu "khớp" - Cần kiên nhẫn hơn |
| Level 7 | Pearl | 2,500 XP | Cần thêm 1,000 XP| Giai đoạn cày cuốc thực sự |
| Level 8 | Obsidian | 4,000 XP | Cần thêm 1,500 XP| Đòi hỏi sự chăm chỉ (Consistency) |
| Level 9 | Diamond | 6,500 XP | Cần thêm 2,500 XP| Bậc thầy lý thuyết |
| Level 10 | Legendary | 10,000 XP | Cần thêm 3,500 XP | Mốc khó nhất, danh hiệu tối thượng |

---

## 3. 🏅 Hệ thống Huy hiệu (Badge Logic)

Huy hiệu (Badges) được chia làm 3 nhóm chính để kích thích các kiểu tâm lý người chơi khác nhau.

### Nhóm 1: Consistency (Sự chăm chỉ - Chống rớt chuỗi)
* **First Lesson:** Hoàn thành bài học đầu tiên trong hệ thống.
* **3-day-streak :** Đăng nhập và hoàn thành bài học 3 ngày liên tiếp.
* **Streak Holder:** Giữ chuỗi học tập (Streak) 7 ngày liên tiếp.
...

### Nhóm 2: Completion (Sự hoàn thiện - Dành cho hệ sưu tầm)
* **Internet Explorer:** Hoàn thành xuất sắc 100% các bài học thuộc Category "Internet".
* **A Hundred!:** Tích lũy tổng cộng 100 câu trả lời đúng trên toàn hệ thống.
* **Flawless Finisher:** Đạt Perfect Score (Đúng 100%) trong 5 bài Quiz liên tiếp.
...

### Nhóm 3: Milestone (Cột mốc - Khoe thành tích cá nhân)
* **DevLingo Pro:** Đạt Level 5 (Ruby).
* **DevLingo Master:** Đạt Level 8 (Obsidian).
* **DevLingo Legendary:** Đạt Level 10 (Legendary).
...

---