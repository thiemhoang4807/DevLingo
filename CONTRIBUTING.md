# DevLingo - Developer Guide & Contributing

## Prerequisites

- Node.js >= 18
- npm >= 9
- Git

## Local Setup

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=devLingoDb
JWT_SECRET=your_jwt_secret_key
```

## Git Workflow

### Branch Strategy

```
main              ← Production (protected)
  │
develop           ← Integration branch (protected)
  │
feature/*         ← New features
bugfix/*          ← Bug fixes
hotfix/*          ← Urgent fixes for production
```

### Quy trình làm việc

```bash
# 1. Clone repo (lần đầu)
git clone <repo-url>
cd devLingo
npm install

# 2. Luôn bắt đầu từ develop mới nhất
git checkout develop
git pull origin develop

# 3. Tạo branch mới
git checkout -b feature/ten-tinh-nang
# hoặc: git checkout -b bugfix/ten-loi

# 4. Code và commit thường xuyên
git add .
git commit -m "feat: add map component"

# 5. Push branch lên remote
git push origin feature/ten-tinh-nang

# 6. Tạo Pull Request trên GitHub
#    - Base: develop
#    - Compare: feature/ten-tinh-nang

# 7. Sau khi PR được merge, xóa branch local
git checkout develop
git pull origin develop
git branch -d feature/ten-tinh-nang
```

### Commit Message Convention

Format: `type: message`

| Type | Mô tả |
|------|-------|
| `feat` | Tính năng mới |
| `fix` | Sửa lỗi |
| `refactor` | Refactor code |
| `docs` | Documentation |
| `test` | Thêm/sửa tests |
| `chore` | Config, dependencies |

Ví dụ:
```
feat: add uesr profile API
fix: resolve login redirect issue
docs: update API documentation
```
## Getting Started

```bash
# Install dependencies
npm install

# Start development (both frontend & backend)
npm run dev

# Or run separately
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:5000
```

## Project Structure
```
devLingo/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── services/
        └── utils/
```

## Adding a New API Endpoint (Backend Example)
1. Create a service logic in `backend/src/services/`:

```typescript
// services/authService.ts
export const loginUser = async (email: string) => {
  return { token: "sample_token" };
};
```
2. Create a controller in `backend/src/controllers/`:
```typescript
// controllers/authController.ts
import { Request, Response } from 'express';
import { loginUser } from '../services/authService';

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await loginUser(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
```
3. Register the route in `backend/src/routes/`:

```typescript
// routes/authRoute.ts
import { Router } from 'express';
import { handleLogin } from '../controllers/authController';

const router = Router();
router.post('/login', handleLogin);

export { router as authRoute };
```
