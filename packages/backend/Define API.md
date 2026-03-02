# 1. Authentication & User APIs (Xác thực và người dùng)

Nhóm này xử lý việc tạo tài khoản, đăng nhập và lấy thông tin cá nhân.

|Method|Endpoint|Description|
|------|--------|-----------|
|POST|`/api/auth/register`|Create a new user account.|
|POST|`/api/auth/login`|Authenticate user and return a token.|
|GET|`/api/users/me`|Get current logged-in user's profile.|

Ví dụ Payload cho API Đăng ký (`POST /api/auth/register`):
```json
// Request Body
{
  "username": "mmb",
  "password": "mmb123",
  "fullName": "Joh Mama"
}

// Success Response (201 Created)
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-string",
    "username": "mmb",
    "role": "student",
    "xp": 0,
    "level": 1
  }
}
```
# 2. Learning APIs (Bài học và câu hỏi)
Nhóm này dùng để Frontend lấy danh sách bài học và chi tiết từ vựng/câu hỏi để hiển thị lên màn hình học tập.
|Method|Endpoint|Description|
|------|--------|-----------|
|GET|`/api/lessons`|Get a list of all published lessons.|
|GET|`/api/lessons/:id`|Get lesson details, including its terms and questions.|

Ví dụ Payload cho API Chi tiết Bài học (`GET /api/lessons/:id`):
```json
// Request: None (Uses URL parameter, e.g., /api/lessons/1)

// Success Response (200 OK)
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Basic Greetings",
    "terms": [
      {
        "id": 1,
        "termName": "Hello",
        "definition": "Used as a greeting or to begin a conversation."
      }
    ],
    "questions": [
      {
        "id": 1,
        "questionText": "How do you greet someone in the morning?",
        "optionA": "Good night",
        "optionB": "Good morning",
        "optionC": "Goodbye",
        "optionD": "See you",
        "correctOption": "B",
        "xpReward": 10
      }
    ]
  }
}
```
# 3. Gamification & Progress APIs (Tiến độ và huy hiệu)
Nhóm này cực kỳ quan trọng đối với một app học tập như devLingo, giúp lưu lại điểm số và cấp phát huy hiệu khi user hoàn thành bài học.
|Method|Endpoint|Description|
|------|--------|-----------|
|POST|`/api/progress`|Update user progress and highest score for a lesson.|
|GET|`/api/users/me/badges`|Get a list of badges unlocked by the current user.|

Ví dụ Payload cho API Cập nhật Tiến độ (`POST /api/progress`):
```json
// Request Body
{
  "lessonId": 1,
  "score": 80,
  "status": "completed"
}

// Success Response (200 OK)
{
  "success": true,
  "message": "Progress updated",
  "data": {
    "userId": "uuid-string",
    "lessonId": 1,
    "highestScore": 80,
    "status": "completed"
  }
}
```
# 4. Leaderboard APIs (Bảng xếp hạng)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/leaderboard` | Get the top users ranked by XP (e.g., top 10 or 20). |

**Example Payload (`GET /api/leaderboard`):**
```json
// Success Response (200 OK)
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "username": "pro_coder",
      "xp": 1500,
      "level": 5
    },
    {
      "rank": 2,
      "username": "johndoe",
      "xp": 1200,
      "level": 4
    }
  ]
}
```

# 5. User Profile Management (Quản lí hồ sơ người dùng)
|Method|Endpoint|Description|
|------|--------|-----------|
|PUT|	`/api/users/me`|	Update user profile (e.g., fullName).|
|PUT|	`/api/users/me/password`|	Change user password.|

# 6. Admin / Content Management APIs
## Lesson Management
|Method|Endpoint|Description|
|------|--------|-----------|
|POST|`/api/admin/lessons`|Create a new lesson.|
|PUT|`/api/admin/lessons/:id`|Update an existing lesson (e.g., publish it).|
|DELETE|`/api/admin/lessons/:id`|Delete a lesson.|
## Term & Question Management
|Method|Endpoint|Description|
|------|--------|-----------|
|POST|`/api/admin/lessons/:id/terms`|Add a new vocabulary term to a specific lesson.|
|POST|`/api/admin/lessons/:id/questions`|Add a new quiz question to a specific lesson.|
## Badge Management
|Method|Endpoint|Description|
|------|--------|-----------|
|POST|`/api/admin/badges`|Create a new badge in the system.|
