# MERN Auth 🔐

A full-stack authentication system using the MERN stack (MongoDB, Express, React, Node.js). It includes user registration, login, protected routes, and JWT-based authentication.

## ✨ Features

- 📝 User signup with form validation
- 🔑 Login with JWT authentication
- 🔒 Protected routes for logged-in users
- 📂 MongoDB for storing user credentials
- 🔐 Passwords hashed with bcrypt

## 🧰 Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), bcrypt

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth

### 2.Install dependencies
Backend
cd server
npm install
Frontend

cd client
npm install

## 3. Setup .env in /server
env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret

## 4. Run the application
Backend
cd server
npm run dev
Frontend
cd client
npm start

Frontend: http://localhost:3000

Backend: http://localhost:5000
