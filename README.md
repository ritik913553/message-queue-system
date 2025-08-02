
# 📨 Message Queue Notification System

This is a full-stack message queue-based notification system built with:

- **Frontend**: React
- **Backend**: Node.js (Express)
- **Queue System**: BullMQ with Redis (via Docker)
- **Worker**: BullMQ Worker to process jobs

---


## 📁 Project Structure

```

.
├── backend
│   ├── src
│   │   ├── queue
│   │   │   └── worker.js       # BullMQ worker
│   │   └── ...                 # Other backend files
│   ├── sample.env            # Sample environment config
│   ├── package.json
│   └── ...
├── frontend
│   ├── src
│   ├── package.json
│   └── ...
└── README.md

````

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

## 📥 Clone the Repository

```bash
git clone https://github.com/ritik913553/message-queue-system
cd message-queue-system

```

## 🔧 Backend Setup

### 1. Start Redis with Docker

```bash
docker run --name redis-queue -p 6379:6379 -d redis
````

> This starts a Redis server on port 6379 in a Docker container.

---

### 2. Configure Environment Variables

Copy the `.env.example` file and rename it to `.env` inside the `backend/` folder:

```bash
cp backend/.env.example backend/.env
```

Fill in the values as needed:

```env
PORT=8000
MONGODB_URI=

# Allowed CORS origin
# CORS_ORIGIN=http://localhost:3000

# JWT Tokens
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL="http://localhost:8000/api/v1/auth/login-with-google/callback"

# Email Config
EMAIL_USER=
EMAIL_PASS=
EMAIL_VERIFICATION_SECRET=
EMAIL_VERIFICATION_SECRET_EXPIRY=10m

# Redis Config
REDIS_HOST=redis
REDIS_PORT=6379
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 4. Start the Backend Server

```bash
npm run dev
```

---

### 5. Run the Worker

In a **separate terminal**, start the BullMQ worker:

```bash
cd backend
node src/queue/worker.js
```

---

## 🌐 Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 2. Start the React App

```bash
npm run dev
```

> The frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔁 Flow Overview

1. Frontend sends a request to trigger a notification.
2. Backend pushes a job to the Redis queue using BullMQ.
3. Worker consumes the job and processes the notification logic (e.g., email, logging, etc.).

---

## 📝 Scripts Summary

| Task           | Command                                               |
| -------------- | ----------------------------------------------------- |
| Run Redis      | `docker run --name redis-queue -p 6379:6379 -d redis` |
| Start Backend  | `npm run dev` (from `/backend`)                         |
| Start Worker   | `node src/queue/worker.js` (from `/backend`)          |
| Start Frontend | `npm run dev` (from `/frontend`)                        |

---

## 📦 Dependencies

**Backend**:

* `express`
* `bullmq`
* `ioredis`
* `jsonwebtoken`
* `mongoose` (if using MongoDB)
* `nodemailer` (for email support)
* `passportjs` (for google login)

**Frontend**:

* `react`
* `axios` (or any HTTP client)


## Flow of the Application

<img width="710" height="757" alt="Screenshot from 2025-08-02 19-44-13" src="https://github.com/user-attachments/assets/c1331ab5-fd9e-478c-9bad-dab60b4f4efc" />



<img width="1307" height="804" alt="Screenshot from 2025-08-02 19-43-55" src="https://github.com/user-attachments/assets/38137b24-eb10-4af4-86d3-8f7d8d82e31e" />


## 🙋‍♂️ Author

Your Name
[GitHub](https://github.com/ritik913553) 


