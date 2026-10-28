# 🎓 Campus Lost & Found — Client Handover & Deployment Guide

Welcome to the **Campus Lost & Found** web application. This document is prepared specifically for your client delivery, explaining how the application is structured, how to run it in 1-click, and how data persistence works.

---

## ⚡ 1-Click Launch Instructions (For Windows Client)

Your client does **NOT** need to install Node.js, npm, or MySQL server.

1. **System Prerequisite**:
   - Make sure **Java JDK 17 or higher** is installed (download free from [Adoptium Eclipse Temurin](https://adoptium.net/)).
2. **Start the Application**:
   - Double-click **`run-app.bat`** in the project root directory.
3. **Open in Browser**:
   - Navigate to: **[http://localhost:8080](http://localhost:8080)**

The unified server handles both the user-facing web portal and the secure REST backend on a single port.

---

## 🔐 Pre-Configured Demo Credentials

| Role | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator 1** | `jegan@gmail.com` | `jegan123` | Full Admin Dashboard, Claim Approvals/Rejections, User Password Reset |
| **Administrator 2** | `nandha@gmail.com` | `Nandha@2007` | Full Admin Dashboard, Claim Approvals/Rejections, User Password Reset |
| **Student** | `student@college.edu` | `student123` | Report Lost Items, Report Found Items, Browse Directory, File Claims |

*(New users can also self-register via the "Sign Up" page).*

---

## 💾 Persistent Database Architecture

### Where is the data stored?
- The database is configured as a **high-performance persistent file database** located in:
  ```
  backend/data/lostfound_db.mv.db
  ```
- **Data Safety**: All reports, claims, registered users, and status changes are permanently saved to disk. Data is **never wiped or lost** when the server is stopped, restarted, or rebooted.

### How to backup the database?
- Simply create a copy of the `backend/data/` folder. To restore, place the folder back into `backend/`.

### Optional: Connecting to an External / Remote MySQL Database
If you or your client wish to host on cloud MySQL (e.g., AWS RDS, Azure MySQL, Docker, or local MySQL Workbench):
1. Import the schema script: **`database/lostfound_mysql.sql`** into your MySQL server.
2. In `backend/src/main/resources/application.properties`, configure the database connection (or set system environment variables):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

---

## 🛠️ Developer Workflow (Editing & Updating Frontend)

If you modify the React TypeScript code in the future:
1. Navigate to the `frontend/` folder.
2. Run development hot-reload server:
   ```powershell
   npm run dev
   ```
   *(Accessible at `http://localhost:5173` with automatic API proxy to port 8080).*
3. When ready to update the client bundle, run:
   ```powershell
   npm run build:sync
   ```
   This compiles the optimized production bundle and automatically copies it into `backend/src/main/resources/static/`.

---

## 🌐 Application Architecture Summary

```
                      +-----------------------------------+
                      |         Client Browser            |
                      |      http://localhost:8080        |
                      +-----------------+-----------------+
                                        |
                         (Single Unified Service)
                                        |
                      +-----------------v-----------------+
                      |    Spring Boot Application        |
                      |   - Static SPA Resource Handler   |
                      |     (React 19 + Tailwind Bundle)  |
                      |   - Spring Security (JWT Auth)    |
                      |   - REST Controllers (/api/**)    |
                      +-----------------+-----------------+
                                        |
                               (Direct JPA Access)
                                        |
                      +-----------------v-----------------+
                      |    Persistent Database Engine     |
                      |   backend/data/lostfound_db.mv.db |
                      +-----------------------------------+
```

---

## 📋 Features Delivered
- ✅ Modern, responsive Glassmorphic UI with Light, Dark, and System Theme toggles.
- ✅ Automated Smart-Matching engine comparing lost and found items.
- ✅ Claim verification pipeline with Admin review & approval.
- ✅ Admin user management & emergency password override.
- ✅ Zero-configuration single-port delivery on `http://localhost:8080`.
- ✅ Permanent on-disk database storage.
