# DevLingo

## Deploy bằng Docker

Project đã có sẵn `Dockerfile.backend`, `Dockerfile.frontend` và `docker-compose.yml`.

### 1. Chuẩn bị server

Cài Docker và Docker Compose trên VPS/server. Nếu máy dùng Docker Compose v2, dùng lệnh `docker compose`. Nếu máy chỉ có Compose cũ, dùng `docker-compose`.

Mở firewall/security group:

- `80/tcp` cho website
- `5000/tcp` chỉ khi bạn muốn gọi API trực tiếp; bình thường frontend đã proxy `/api` qua Nginx nên không bắt buộc public port này

### 2. Tạo file môi trường

```bash
cp .env.example .env
```

Sửa `.env`:

```env
JWT_SECRET=doi_chuoi_bi_mat_that_dai_o_day
CORS_ORIGIN=http://your-domain.com
```

Nếu chạy local thì để `CORS_ORIGIN=http://localhost`.

### 3. Build và chạy production

Với Docker Compose v2:

```bash
docker compose up -d --build
```

Với Docker Compose cũ:

```bash
docker-compose up -d --build
```

Sau khi chạy:

- Frontend: `http://SERVER_IP/`
- Backend API health: `http://SERVER_IP/api/lessons`

### 4. Quản lý container

```bash
docker compose logs -f
docker compose ps
docker compose restart
docker compose down
```

Nếu dùng Compose cũ, thay `docker compose` bằng `docker-compose`.

### 5. Dữ liệu

SQLite database và uploads được lưu trong Docker volumes:

- `backend-data`
- `backend-uploads`

Không dùng `docker compose down -v` nếu không muốn xóa database và file upload.

### 6. Deploy với domain và HTTPS

Trỏ DNS domain về IP server, sau đó đặt reverse proxy/SSL ở trước service frontend. Cách phổ biến là dùng Nginx/Caddy trên host hoặc một container reverse proxy riêng để cấp HTTPS và forward traffic vào port `80` của app.
