# 🚀 PawLink Backend API

A scalable RESTful API powering the PawLink Lost & Found Pet Recovery Platform.

The backend provides authentication, authorization, pet report management, location tracking, bookmarking, flyer generation support, administrative tools, and user management functionality.

Built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **JWT Authentication**.

---

# 📖 Overview

PetResQ Backend serves as the core service layer responsible for:

* User Authentication
* Authorization
* Lost Pet Report Management
* Found Pet Report Management
* Bookmark Management
* User Management
* Role Management
* OTP Verification
* Email Services
* Administrative Analytics

---

# ✨ Features

## 🔐 Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* OTP Verification
* Password Reset

---

## 👤 User Management

* Create User Accounts
* Update Profiles
* Delete Accounts
* Manage Roles
* Account Verification

---

## 🐕 Lost Pet Management

Users can:

* Create Lost Pet Reports
* Update Reports
* Delete Reports
* Upload Pet Images
* Add Location Data

---

## 🐾 Found Pet Management

Users can:

* Report Found Pets
* Upload Images
* Add Discovery Locations
* Update Reports

---

## 🔖 Bookmark System

Users can:

* Save Reports
* Remove Bookmarks
* View Saved Reports

---

## 📊 Administrative Features

### Administrator

* Manage Users
* Manage Reports
* Change User Roles
* View Platform Statistics
* Monitor Platform Activity

### Moderator

* Review Reports
* Monitor Community Activity
* Manage Content

---

# 🏗️ System Architecture

## High-Level Architecture

```text
┌─────────────────────────┐
│      Frontend App       │
│  React + TypeScript     │
└───────────┬─────────────┘
            │
        HTTP Requests
            │
            ▼
┌─────────────────────────┐
│     Express Server      │
│       REST API          │
└───────────┬─────────────┘
            │
 ┌──────────┴──────────┐
 ▼                     ▼
Controllers       Middleware
                        │
                        ▼
                 JWT Validation
                        │
                        ▼
                 Authorization
                        │
                        ▼
┌─────────────────────────┐
│        Services         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│       MongoDB           │
└─────────────────────────┘
```

---

# 🔐 Authentication Flow

```text
User Login
     │
     ▼
POST /auth/login
     │
     ▼
Verify Credentials
     │
     ▼
Generate JWT Token
     │
     ▼
Return Token
     │
     ▼
Access Protected APIs
```

---

# 🔑 Password Recovery Flow

```text
Forgot Password
       │
       ▼
Generate OTP
       │
       ▼
Send Email
       │
       ▼
Verify OTP
       │
       ▼
Create New Password
       │
       ▼
Update User Record
```

---

# 🐾 Pet Reporting Flow

```text
Create Report
      │
      ▼
Validate Request
      │
      ▼
Upload Image
      │
      ▼
Store Data
      │
      ▼
MongoDB
      │
      ▼
Success Response
```

---

# 🛠️ Technology Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## File Handling

* Multer
* Cloudinary (if configured)

## Communication

* Nodemailer

## Development Tools

* Nodemon
* ESLint
* Postman

---

# 📂 Project Structure

```text
src/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── services/
│
├── utils/
│
├── validations/
│
└── server.ts
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| POST   | /auth/register        | Register User  |
| POST   | /auth/login           | User Login     |
| POST   | /auth/forgot-password | Send OTP       |
| POST   | /auth/verify-otp      | Verify OTP     |
| POST   | /auth/reset-password  | Reset Password |

---

## Users

| Method | Endpoint   | Description |
| ------ | ---------- | ----------- |
| GET    | /users     | Get Users   |
| GET    | /users/:id | Get User    |
| PUT    | /users/:id | Update User |
| DELETE | /users/:id | Delete User |

---

## Pet Reports

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /posts     | Get All Posts |
| GET    | /posts/:id | Get Post      |
| POST   | /posts     | Create Post   |
| PUT    | /posts/:id | Update Post   |
| DELETE | /posts/:id | Delete Post   |

---

## Bookmarks

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /bookmarks     | Get User Bookmarks |
| POST   | /bookmarks     | Add Bookmark       |
| DELETE | /bookmarks/:id | Remove Bookmark    |

---

# ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

EMAIL_USER=your_email

EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ivanjayyy/rad-final-coursework-be.git

cd rad-final-coursework-be
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm start
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Authorization
* OTP Verification
* Input Validation
* Secure Environment Variables

---

# 📈 Future Improvements

* WebSocket Notifications
* AI Pet Recognition
* Advanced Analytics
* Audit Logging
* Rate Limiting
* API Versioning
* Microservice Architecture

---

# 🧪 Testing

Recommended tools:

* Postman
* Thunder Client
* MongoDB Compass

---

# 🤝 Contributing

1. Fork the repository

```bash
git fork
```

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push changes

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project was developed for academic and educational purposes.

---

# 👨‍💻 Author

**Ivan Adithya**

GitHub: https://github.com/ivanjayyy

---

## 🐾 Powering PawLink — Helping Lost Pets Find Their Way Home
