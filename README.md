<div align="center">

# 🔐 User Authentication & Authorization System

### Complete JWT-based Authentication with Email OTP Verification

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8.0-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Testing](#-testing) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Authentication Flow](#-authentication-flow)
- [Testing with Postman](#-testing-with-postman)
- [Deployment](#-deployment)
- [Security Features](#-security-features)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

<table>
<tr>
<td>

### 🎯 Core Features
- ✅ User Registration with Email Verification
- ✅ 6-Digit OTP Email Verification
- ✅ Resend OTP Functionality
- ✅ Secure Login with JWT Tokens
- ✅ Password Reset via Email OTP
- ✅ Protected Routes with Bearer Token
- ✅ Password Hashing (bcrypt)

</td>
<td>

### 🛡️ Security Features
- ✅ JWT Token Authentication
- ✅ Password Encryption (12 rounds)
- ✅ OTP Expiration (10 minutes)
- ✅ Email Verification Required
- ✅ Input Validation
- ✅ Error Handling
- ✅ Secure Password Reset

</td>
</tr>
</table>

---

## 🚀 Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | Runtime Environment | v18+ |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Web Framework | v4.18 |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) | Database | v8.0 |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | Authentication | v9.0 |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=for-the-badge&logo=gmail&logoColor=white) | Email Service | v6.9 |

</div>

**Dependencies:**
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "nodemailer": "^6.9.7",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

---

## 📁 Project Structure

```
auth-system/
│
├── config/
│   ├── db.js                 # MongoDB connection
│   └── email.js              # Email service (Nodemailer)
│
├── controllers/
│   └── authController.js     # Authentication logic
│
├── middleware/
│   └── auth.js               # JWT verification middleware
│
├── models/
│   └── User.js               # User schema & methods
│
├── routes/
│   └── authRoutes.js         # API routes
│
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── server.js                # Entry point
└── README.md                # Documentation
```

---

## 🔧 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account
- Gmail Account (for email OTP)

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
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
```

### Step 4: Setup Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (Enable it)
3. Go to **App Passwords**
4. Generate password for "Mail"
5. Copy 16-character password
6. Paste in `.env` as `EMAIL_PASSWORD`

### Step 5: Start Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

---

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key_min_32_chars` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Gmail address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `16_character_password` |
| `EMAIL_FROM` | Sender email | `your_email@gmail.com` |

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
| POST | `/verify-email` | Verify email with OTP | ❌ |
| POST | `/resend-otp` | Resend verification OTP | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/forgot-password` | Request password reset | ❌ |
| POST | `/reset-password` | Reset password with OTP | ❌ |
| GET | `/me` | Get user profile | ✅ |

---

### 1️⃣ Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "Registration successful! Please check your email for OTP verification",
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": false
  }
}
```

**Note:** Check your email for 6-digit OTP (expires in 10 minutes)

---

### 2️⃣ Verify Email

**Endpoint:** `POST /api/auth/verify-email`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Email verified successfully! You can now login"
}
```

---

### 3️⃣ Resend OTP

**Endpoint:** `POST /api/auth/resend-otp`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

---

### 4️⃣ Login User

**Endpoint:** `POST /api/auth/login`

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": true
  }
}
```

**Note:** Save the token for protected routes

---

### 5️⃣ Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password reset OTP sent to your email"
}
```

---

### 6️⃣ Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password reset successful! You can now login with new password"
}
```

---

### 7️⃣ Get User Profile (Protected)

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "65abc123def456789",
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🔄 Authentication Flow

### Registration & Verification Flow

```mermaid
graph LR
    A[Register] --> B[Receive OTP Email]
    B --> C[Verify Email]
    C --> D[Login]
    D --> E[Access Protected Routes]
```

**Steps:**
1. User registers with username, email, password
2. System sends 6-digit OTP to email
3. User verifies email with OTP
4. User can now login
5. System returns JWT token
6. User accesses protected routes with token

### Password Reset Flow

```mermaid
graph LR
    A[Forgot Password] --> B[Receive OTP Email]
    B --> C[Reset Password]
    C --> D[Login with New Password]
```

**Steps:**
1. User requests password reset
2. System sends OTP to email
3. User submits OTP + new password
4. Password updated successfully
5. User logs in with new password

---

## 🧪 Testing with Postman

### Quick Start

1. **Import Collection** (Optional)
   - Import `Postman_Collection.json` file
   - Set `BASE_URL` variable to `http://localhost:5000`

2. **Manual Testing Steps**

#### Step 1: Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "your_email@gmail.com",
  "password": "password123"
}
```
✅ Check your email for OTP

#### Step 2: Verify Email
```http
POST http://localhost:5000/api/auth/verify-email
Content-Type: application/json

{
  "email": "your_email@gmail.com",
  "otp": "123456"
}
```

#### Step 3: Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "your_email@gmail.com",
  "password": "password123"
}
```
✅ Copy the JWT token from response

#### Step 4: Get Profile (Protected)
```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_jwt_token>
```

### Testing Checklist

- [ ] Server is running (`npm start`)
- [ ] MongoDB is connected
- [ ] Gmail App Password is configured
- [ ] Using real email address
- [ ] OTP received in email
- [ ] Token copied correctly
- [ ] Bearer token format: `Bearer <token>`

---

## 🚀 Deployment

### Deploy on Render

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `auth-system`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables**
   - Add all variables from `.env` file
   - Click "Create Web Service"

4. **Test Deployed API**
   - Use deployed URL: `https://your-app.onrender.com`
   - Update Postman BASE_URL
   - Test all endpoints

### Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas configured
- [ ] Environment variables added on Render
- [ ] Gmail App Password working
- [ ] Deployment successful
- [ ] All endpoints tested

---

## 🛡️ Security Features

| Feature | Implementation | Details |
|---------|----------------|----------|
| **Password Hashing** | bcryptjs | 12 rounds of salting |
| **JWT Tokens** | jsonwebtoken | Stateless authentication |
| **OTP Expiration** | Time-based | 10 minutes validity |
| **Email Verification** | Required | Login blocked until verified |
| **Protected Routes** | Middleware | Bearer token required |
| **Input Validation** | Mongoose | Schema-level validation |
| **Error Handling** | Try-Catch | Comprehensive error messages |

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>❌ Email not received</b></summary>

**Solutions:**
- Check spam/junk folder
- Verify Gmail App Password is correct
- Ensure 2-Step Verification is enabled
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Test with different email address
</details>

<details>
<summary><b>❌ MongoDB connection error</b></summary>

**Solutions:**
- Check MONGODB_URI format
- Verify username and password
- Whitelist IP: 0.0.0.0/0 in MongoDB Atlas
- Check internet connection
- Ensure cluster is active
</details>

<details>
<summary><b>❌ JWT token error</b></summary>

**Solutions:**
- Check token format: `Bearer <token>`
- Ensure space after "Bearer"
- Verify JWT_SECRET is set
- Token might be expired
- Copy full token without truncation
</details>

<details>
<summary><b>❌ OTP expired</b></summary>

**Solutions:**
- OTP valid for 10 minutes only
- Use `/resend-otp` endpoint
- Check email timestamp
- Verify system time is correct
</details>

<details>
<summary><b>❌ Cannot login</b></summary>

**Solutions:**
- Verify email first
- Check credentials are correct
- Ensure password matches
- Account might not exist
</details>

---

## 📊 Response Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | ✅ OK | Request successful |
| 201 | ✅ Created | User registered successfully |
| 400 | ❌ Bad Request | Invalid input data |
| 401 | ❌ Unauthorized | Invalid credentials or token |
| 404 | ❌ Not Found | User not found |
| 500 | ❌ Server Error | Internal server error |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ by [Your Name]**

[⬆ Back to Top](#-user-authentication--authorization-system)

</div>
