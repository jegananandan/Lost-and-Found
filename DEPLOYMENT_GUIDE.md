# 🚀 Campus Lost & Found — Complete Deployment Guide

This guide covers the 3 best ways to deploy your application for your client:

1. **[Method 1: Cloud Web Service (Render.com — Free & Easiest)](#method-1-cloud-web-service-rendercom--easiest-for-client)**
2. **[Method 2: Docker Container (VPS / AWS / DigitalOcean / Local Server)](#method-2-docker--docker-compose-any-vps--server)**
3. **[Method 3: On-Premises College Server (Windows / Linux Intranet)](#method-3-on-premises-college-server-intranet)**

---

## Method 1: Cloud Web Service (Render.com — Easiest for Client)

Because the React frontend is now bundled directly into Spring Boot, **you only deploy 1 service** to host the entire full-stack app for free.

### Step 1: Push Code to GitHub
Open PowerShell in the project root and run:
```powershell
git init
git add .
git commit -m "Production ready Lost and Found application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lost-and-found.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to **[https://render.com](https://render.com)** and create a free account.
2. Click **New +** -> Select **Web Service**.
3. Choose **Build and deploy from a Git repository** and connect your GitHub repo.
4. Fill in these settings:
   - **Name**: `campus-lost-and-found`
   - **Root Directory**: `backend`
   - **Environment**: `Java` (or choose `Docker`)
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/lostfound-backend-1.0.0.jar`
   - **Plan**: `Free`
5. Click **Deploy Web Service**!

Render will build and give you a live URL (e.g., `https://campus-lost-and-found.onrender.com`).
Both the React web UI and the API work together instantly with zero CORS issues!

---

## Method 2: Docker & Docker Compose (Any VPS / Server)

If your client has a Linux VPS (Ubuntu, Debian), AWS EC2 instance, or DigitalOcean droplet:

### 1-Command Deployment with Docker Compose
1. Copy the project folder to the server.
2. Run:
   ```bash
   docker compose up -d --build
   ```
3. Open `http://YOUR_SERVER_IP:8080`.

**Persistent Data**: The `./backend/data` folder is mounted as a volume, meaning all items, users, and reports are safely preserved across container restarts and updates.

To stop or restart:
```bash
docker compose down      # Stop
docker compose up -d     # Start in background
```

---

## Method 3: On-Premises College Server (Intranet)

If your client wants to run it inside the college so students and teachers on campus Wi-Fi can access it locally:

### On a Windows Server / Machine:
1. Copy the project folder to the college server.
2. Ensure **Java JDK 17+** is installed.
3. Double-click **`run-app.bat`**.
4. Find the server's local IP address (run `ipconfig` in CMD, e.g., `192.168.1.50`).
5. Anyone connected to the campus Wi-Fi can open:
   ```
   http://192.168.1.50:8080
   ```

### (Optional) Run Automatically on Windows Boot as a Background Service:
Use [NSSM (Non-Sucking Service Manager)](https://nssm.cc/):
```powershell
nssm install LostAndFound "C:\Program Files\Eclipse Adoptium\jdk-17\bin\java.exe" "-jar C:\path\to\backend\target\lostfound-backend-1.0.0.jar"
nssm start LostAndFound
```

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|---|---|---|
| **Student** | `student@college.edu` | `student123` |
| **Admin 1** | `jegan@gmail.com` | `jegan123` |
| **Admin 2** | `nandha@gmail.com` | `Nandha@2007` |

---

## 🔄 Updating Frontend Code Before Deployment
If you make any changes to files in `frontend/src/`:
```powershell
cd frontend
npm run build:sync
```
This automatically updates `backend/src/main/resources/static/` so your deployment includes all recent UI changes.
