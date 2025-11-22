# Student Management System

## Week 4 Full Stack Development Assignment

**Topics Covered:** Docker, Cloud Deployment, CI/CD, Monitoring & Scaling  

**Live App URL:** [https://student-management-system-q3u2.onrender.com](https://student-management-system-q3u2.onrender.com)  

**GitHub Repository:** [Your GitHub Repo Link](https://github.com/YourUsername/StudentManagementSystem)

---

## Features

- Full CRUD operations for students (Create, Read, Update, Delete)
- MongoDB Atlas as database
- Backend with Node.js + Express
- Frontend served via Express
- Dockerized backend and MongoDB with Docker Compose
- Health check endpoint (`/health`)  
- Prometheus metrics (`/metrics`) and Grafana dashboard for monitoring

---

## Screenshots

### Grafana Monitoring Dashboard

![Grafana Dashboard](screenshots/grafana_dashboard.png)

---

## Deployment Steps

1. **Dockerization**
   - Created `Dockerfile` for backend.
   - Added `.dockerignore` to ignore unnecessary files.
   - Built and ran the container locally using:
     ```bash
     docker build -t student-backend .
     docker run -p 5000:5000 student-backend
     ```

2. **Docker Compose**
   - Created `docker-compose.yml` to run Node.js backend + Prometheus + Grafana together.
   - Set environment variables in `.env`:
     ```
     MONGO_URI=<Your MongoDB Atlas URI>
     PORT=5000
     GF_SECURITY_ADMIN_PASSWORD=admin
     ```
   - Started services:
     ```bash
     docker-compose up -d
     ```

3. **Cloud Deployment**
   - Backend deployed on Render ([Live URL](https://student-management-system-q3u2.onrender.com))
   - MongoDB Atlas used as cloud database.

4. **CI/CD (GitHub Actions)**
   - Added `.github/workflows/deploy.yml` to automate Docker image build & push.
   - Optional auto-deploy on every push to main branch.

5. **Monitoring & Health Checks**
   - Added `/health` route to backend for liveness.
   - Exposed Prometheus metrics via `/metrics`.
   - Grafana configured with Prometheus as data source.
   - Built dashboard to visualize CPU, memory, event loop lag, and other metrics.

---

## Short Summary – Deployment Steps & Challenges Faced

- **Steps:**
  1. Dockerized backend and tested locally.
  2. Configured Docker Compose to run backend, Prometheus, and Grafana.
  3. Deployed backend on Render with MongoDB Atlas as database.
  4. Added Prometheus metrics and Grafana dashboard for monitoring.
  5. Created GitHub Actions workflow for automated CI/CD (Docker image build & push).

- **Challenges:**
  - Configuring Docker Compose networking to allow Grafana to query Prometheus.
  - Mapping Prometheus metrics path correctly from backend.
  - Connecting Grafana to Prometheus and visualizing Node.js metrics.
  - Handling environment variables securely for cloud deployment.

---

## Future Improvements

- Implement logging with Grafana Loki or ELK Stack.
- Add alerts for CPU/memory thresholds in Grafana.
- Enhance frontend UI for better usability.

