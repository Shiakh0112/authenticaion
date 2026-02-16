<div align="center">

# 🔐 User Authentication & Authorization System

### Simple JWT-based Authentication with Bearer Token

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8.0-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Testing with Postman](#-testing-with-postman)
- [Test Cases](#-test-cases)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- ✅ User Registration with Password Hashing
- ✅ User Login with JWT Token Generation
- ✅ Protected Routes with Bearer Token Authentication
- ✅ MongoDB Database Integration
- ✅ Input Validation & Error Handling
- ✅ MVC Architecture Pattern
- ✅ RESTful API Design

---

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|----------|
| **Node.js** | Runtime Environment | v18+ |
| **Express.js** | Web Framework | v4.18 |
| **MongoDB** | Database | v8.0 |
| **Mongoose** | ODM for MongoDB | v8.0 |
| **JWT** | Token Authentication | v9.0 |
| **bcryptjs** | Password Hashing | v2.4 |

---

## 📁 Project Structure

```
auth-system/
│
├── config/
│   └── db.js                 # MongoDB connection configuration
│
├── controllers/
│   └── authController.js     # Authentication logic (register, login, getMe)
│
├── middleware/
│   └── auth.js               # JWT verification middleware
│
├── models/
│   └── User.js               # User schema with password hashing
│
├── routes/
│   └── authRoutes.js         # API routes definition
│
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── server.js                # Application entry point
└── README.md                # Documentation
```

---

## 🔧 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account
- Git

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd auth-system
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` file in root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/authDB
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d
```

**Important Notes:**
- Replace `username` and `password` with your MongoDB credentials
- Use a strong JWT_SECRET (minimum 32 characters)
- Never commit `.env` file to GitHub

### Step 4: Start Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/auth
```

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| GET | `/me` | Get user profile | ✅ Bearer Token |

---

### 1️⃣ Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Creates a new user account with hashed password

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `username`: Required, minimum 3 characters, unique
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "success": false,
  "message": "Please provide username, email and password"
}
```

`400 Bad Request` - User already exists:
```json
{
  "success": false,
  "message": "User already exists with this email or username"
}
```

---

### 2️⃣ Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticates user and returns JWT token

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJjMTIzZGVmNDU2Nzg5IiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDA2MDQ3OTl9.xyz123abc456",
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

`401 Unauthorized` - Invalid credentials:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3️⃣ Get User Profile (Protected)

**Endpoint:** `GET /api/auth/me`

**Description:** Returns current user information (requires authentication)

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

`401 Unauthorized` - No token provided:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

`401 Unauthorized` - Invalid token:
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## 🧪 Testing with Postman

### Complete Testing Flow

#### Step 1: Register User

1. Open Postman
2. Create new request
3. Set method to `POST`
4. Enter URL: `http://localhost:5000/api/auth/register`
5. Go to **Headers** tab:
   - Key: `Content-Type`
   - Value: `application/json`
6. Go to **Body** tab:
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter:
   ```json
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```
7. Click **Send**
8. Verify response status: `201 Created`

#### Step 2: Login User

1. Create new request
2. Set method to `POST`
3. Enter URL: `http://localhost:5000/api/auth/login`
4. Go to **Headers** tab:
   - Key: `Content-Type`
   - Value: `application/json`
5. Go to **Body** tab:
   - Select `raw`
   - Select `JSON`
   - Enter:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
6. Click **Send**
7. **Copy the token** from response
8. Verify response status: `200 OK`

#### Step 3: Get User Profile (Protected)

1. Create new request
2. Set method to `GET`
3. Enter URL: `http://localhost:5000/api/auth/me`
4. Go to **Headers** tab:
   - Key: `Authorization`
   - Value: `Bearer <paste_your_token_here>`
   - Key: `Content-Type`
   - Value: `application/json`
5. Click **Send**
6. Verify response status: `200 OK`

**Important:** Ensure there's a space between "Bearer" and the token!

---

## ✅ Test Cases

### Test Case 1: Successful User Registration

**Input:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Output:**
- Status Code: `201`
- Response contains user data
- Password is hashed in database
- User can login

**Steps:**
1. Send POST request to `/api/auth/register`
2. Verify status code is 201
3. Verify response contains `success: true`
4. Verify user data is returned
5. Check MongoDB - password should be hashed

---

### Test Case 2: Registration with Duplicate Email

**Input:**
```json
{
  "username": "johndoe2",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Output:**
- Status Code: `400`
- Error message: "User already exists with this email or username"

**Steps:**
1. Register first user
2. Try to register with same email
3. Verify status code is 400
4. Verify error message

---

### Test Case 3: Registration with Missing Fields

**Input:**
```json
{
  "username": "johndoe",
  "email": "john@example.com"
}
```

**Expected Output:**
- Status Code: `400`
- Error message: "Please provide username, email and password"

---

### Test Case 4: Registration with Invalid Email

**Input:**
```json
{
  "username": "johndoe",
  "email": "invalid-email",
  "password": "password123"
}
```

**Expected Output:**
- Status Code: `500` or `400`
- Validation error for email format

---

### Test Case 5: Registration with Short Password

**Input:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123"
}
```

**Expected Output:**
- Status Code: `500` or `400`
- Error: "Password must be at least 6 characters"

---

### Test Case 6: Successful Login

**Input:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Output:**
- Status Code: `200`
- Response contains JWT token
- Token is valid and can be decoded

**Steps:**
1. Register user first
2. Send POST request to `/api/auth/login`
3. Verify status code is 200
4. Verify token is present in response
5. Verify user data is returned

---

### Test Case 7: Login with Wrong Password

**Input:**
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

**Expected Output:**
- Status Code: `401`
- Error message: "Invalid credentials"

---

### Test Case 8: Login with Non-existent Email

**Input:**
```json
{
  "email": "nonexistent@example.com",
  "password": "password123"
}
```

**Expected Output:**
- Status Code: `401`
- Error message: "Invalid credentials"

---

### Test Case 9: Login with Missing Fields

**Input:**
```json
{
  "email": "john@example.com"
}
```

**Expected Output:**
- Status Code: `400`
- Error message: "Please provide email and password"

---

### Test Case 10: Get Profile with Valid Token

**Headers:**
```
Authorization: Bearer <valid_token>
```

**Expected Output:**
- Status Code: `200`
- Response contains user profile data

**Steps:**
1. Login to get token
2. Send GET request to `/api/auth/me` with token
3. Verify status code is 200
4. Verify user data is returned

---

### Test Case 11: Get Profile without Token

**Headers:**
```
(No Authorization header)
```

**Expected Output:**
- Status Code: `401`
- Error message: "Not authorized to access this route"

---

### Test Case 12: Get Profile with Invalid Token

**Headers:**
```
Authorization: Bearer invalid_token_123
```

**Expected Output:**
- Status Code: `401`
- Error message: "Invalid or expired token"

---

### Test Case 13: Get Profile with Expired Token

**Headers:**
```
Authorization: Bearer <expired_token>
```

**Expected Output:**
- Status Code: `401`
- Error message: "Invalid or expired token"

---

### Test Case 14: Password Hashing Verification

**Steps:**
1. Register a user with password "password123"
2. Check MongoDB database
3. Verify password is hashed (starts with $2a$ or $2b$)
4. Verify original password is not stored

**Expected:**
- Password in DB: `$2a$12$...` (hashed)
- Original password not visible

---

### Test Case 15: JWT Token Validation

**Steps:**
1. Login to get token
2. Decode token at https://jwt.io/
3. Verify payload contains user ID
4. Verify expiration time is set

**Expected:**
- Token contains `id` field
- Token has `exp` (expiration) field
- Token is signed with JWT_SECRET

---

## 🚀 Deployment on Render

### Step 1: Prepare for Deployment

1. **Create `.gitignore` file:**
```
node_modules/
.env
*.log
```

2. **Ensure `package.json` has start script:**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Auth system"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 3: Deploy on Render

1. Go to [Render Dashboard](https://render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `auth-system`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Add Environment Variables

In Render dashboard, add:
```
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key-32-chars>
JWT_EXPIRE=7d
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Get your deployed URL: `https://your-app.onrender.com`

### Step 6: Test Deployed API

Update Postman base URL to:
```
https://your-app.onrender.com/api/auth
```

Test all endpoints with deployed URL.

---

## 🛡️ Security Features

| Feature | Implementation | Details |
|---------|----------------|----------|
| **Password Hashing** | bcryptjs | 12 rounds of salting |
| **JWT Authentication** | jsonwebtoken | Stateless token-based auth |
| **Protected Routes** | Middleware | Bearer token verification |
| **Input Validation** | Mongoose | Schema-level validation |
| **Error Handling** | Try-Catch | Comprehensive error messages |
| **Environment Variables** | dotenv | Secure configuration |

---

## 🐛 Troubleshooting

### Issue 1: MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Solutions:**
- Check MONGODB_URI format
- Verify username and password
- Whitelist IP: `0.0.0.0/0` in MongoDB Atlas
- Check internet connection

### Issue 2: JWT Token Error

**Error:** `Invalid or expired token`

**Solutions:**
- Check token format: `Bearer <token>`
- Ensure space after "Bearer"
- Verify JWT_SECRET is set in .env
- Token might be expired (check JWT_EXPIRE)

### Issue 3: Cannot Login

**Error:** `Invalid credentials`

**Solutions:**
- Verify user is registered
- Check email and password are correct
- Ensure password meets minimum length (6 chars)

### Issue 4: Port Already in Use

**Error:** `EADDRINUSE`

**Solutions:**
- Change PORT in .env file
- Kill process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Issue 5: Environment Variables Not Loading

**Error:** `undefined` for process.env variables

**Solutions:**
- Ensure `.env` file is in root directory
- Check `dotenv.config()` is called first in server.js
- Restart server after changing .env
- No spaces around `=` in .env file

---

## 📊 Response Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | ✅ OK | Request successful |
| 201 | ✅ Created | User registered successfully |
| 400 | ❌ Bad Request | Invalid input data |
| 401 | ❌ Unauthorized | Invalid credentials or token |
| 404 | ❌ Not Found | Resource not found |
| 500 | ❌ Server Error | Internal server error |

---

## 📝 Assignment Requirements Checklist

- [x] MVC pattern with separate folders
- [x] MongoDB database using Mongoose
- [x] User model with username, email, password
- [x] Route for user registration
- [x] Controller function for registration
- [x] Password hashing before saving
- [x] Success message on registration
- [x] Route for user login
- [x] Controller function for login
- [x] Credential verification
- [x] JWT generation on login
- [x] JWT returned to user
- [x] Middleware for JWT verification
- [x] Token decoding to get user info
- [x] User info attached to request object
- [x] Route to get user information
- [x] Controller for get user info
- [x] Token verification middleware on protected route
- [x] User info returned from token
- [x] API documentation
- [x] Sample requests and responses
- [x] Error handling and validation
- [x] Clean, readable code
- [x] README file

---

## 📄 License

MIT

---

## 👨‍💻 Author

Open Source Project

---

<div align="center">

**Made with ❤️ for Learning**

[⬆ Back to Top](#-user-authentication--authorization-system)

</div>
