# 🎓 College Lost & Found Full-Stack Web Application — Project Summary & Handover Document

## 🌐 Live Cloud Application Links

* **Live Frontend Website**: [https://lost-and-found-indol-rho.vercel.app](https://lost-and-found-indol-rho.vercel.app)
* **Live Spring Boot API Backend**: `https://lost-and-found-1.onrender.com/api`
* **Live Cloud MySQL Database**: Railway (`monorail.proxy.rlwy.net`)
* **GitHub Repository**: [https://github.com/jegananandan/Lost-and-Found](https://github.com/jegananandan/Lost-and-Found)

---

## 🔑 Demo Access Credentials

| Account Role | Email Address | Password | Functionality |
| :--- | :--- | :--- | :--- |
| **Administrator** | `jegan@gmail.com` | `jegan123` | Admin Dashboard, Claim Approvals/Rejections, Item & User Management, System Analytics |
| **Student** | `student@college.edu` | `student123` | Report Lost Item, Report Found Item, Smart Match, Claim Item, Track Claims & Activity |

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **Backend**: Java 17 + Spring Boot 3 + Spring Data JPA + Spring Security (JWT)
- **Database**: MySQL (`lost_found_web` database with full persistence)
- **Cloud Infrastructure**:
  - Frontend hosted on **Vercel**
  - Backend API containerized with Docker on **Render.com**
  - MySQL Database hosted on **Railway.app**

---

## 📂 Local Project Structure

```
c:\Users\hp\Documents\JAVA WEB APP\
├── backend/                  # Spring Boot 3 API Project
│   ├── src/                  # Controllers, Entities, Repositories, Services, Security
│   ├── pom.xml               # Maven configuration
│   └── Dockerfile            # Cloud container build script
├── frontend/                 # React TypeScript Vite UI
│   ├── src/                  # Student & Admin pages, components, context, services
│   ├── package.json          # Dependencies & scripts
│   └── tailwind.config.js    # Design system styling
├── cloud_deployment_guide.md # Deployment instructions
├── walkthrough.md            # System architecture & feature guide
└── PROJECT_SUMMARY.md        # Handover documentation
```

---

## 🚀 How to Run Locally

### 1. Run Spring Boot Backend (Port 8080)
```powershell
cd "c:\Users\hp\Documents\JAVA WEB APP\backend"
mvn spring-boot:run
```

### 2. Run React Frontend (Port 5173)
```powershell
cd "c:\Users\hp\Documents\JAVA WEB APP\frontend"
npm run dev
```

Open your browser at `http://localhost:5173`.
