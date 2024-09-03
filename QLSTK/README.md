## Để chạy thử
**Bước 1:** Tải Docker và DBeaver và Nodejs
  - DBeaver: https://dbeaver.io/download/
  - Docker: https://docs.docker.com/desktop/install/windows-install/
  - Nodejs: https://nodejs.org/en/download/package-manager

**Bước 2:** Pull code về: `git pull origin main`

**Bước 3:** Tạo database MYSQL với docker
- Vào folder QLSTK/docker chạy câu lệnh: `docker compose -f mysql.yml -p nodejs-sql up -d` 
    - `-f`: file name
    - `-p`: project name
    - `-d`: detach, run as background
- Tạo connection trong DBeaver --> Test connection (Download driver nếu cần) --> OK: Config như ảnh (Port: 3307 - Password: 123456)
    ![image](/Config_DBeaver.png) 

**Bước 4:** Tải các package:

`npm i ejs`

`npm i --save-exact express`

`npm i --save-exact mysql2`

`npm i --save-dev nodemon`

**Bước 5:** Khởi chạy docker


**Bước 6:** Vào folder QLSTK chạy câu lệnh: `npm run dev`. Truy cập đường link và trải nghiệm SEBank.

**Lưu ý:** Từ những lần chạy sau chỉ cần chạy bước 5 và bước 6