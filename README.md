# YouTube Clone

<div align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Responsive-UI-orange?style=flat&logo=css3&logoColor=white" alt="Responsive UI">
</div>

A full-stack YouTube-inspired web application built using React, Node.js, Express, MongoDB, and JWT authentication. The project demonstrates frontend and backend integration, route protection, user authentication, responsive design, and practical MERN-style application structure for portfolio and GitHub showcase purposes.

## Overview

This project recreates core user-facing patterns of a video platform interface while focusing on authentication flow and full-stack connectivity. It is designed as a practical learning and showcase project to demonstrate skills in React-based UI development, backend API creation, MongoDB integration, and secure login/signup implementation.

## Features

- User registration and login functionality
- JWT-based authentication and authorization
- Protected backend routes
- MongoDB integration for storing authentication data
- Responsive user interface for desktop and smaller screens
- Modular frontend and backend folder separation
- Clean project structure suitable for GitHub submission and portfolio use

## Tech Stack

### Frontend
- React.js
- JavaScript
- CSS3
- Responsive Design

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

### Database
- MongoDB

## Project Structure

```text
reactProject/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── package.json
└── README.md
```

## Authentication Flow

The backend uses JWT to authenticate users after successful login. User credentials are validated, and the server issues a token that can be used to access protected routes. MongoDB stores the user records, while the frontend interacts with backend API endpoints to complete signup and login operations.

## Environment Variables

Create a `.env` file inside the `backend` folder with the following values:

```env
MONGODB_URI=mongodb://localhost:27017/auth-db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

### Variable Details

- `MONGODB_URI` connects the application to the local MongoDB database named `auth-db`.
- `JWT_SECRET` is used to sign and verify authentication tokens.
- `PORT` defines the backend server port.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd reactProject
```

### 2. Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Start MongoDB

Make sure MongoDB is running locally before testing registration and login. The application expects the database to be available at `mongodb://localhost:27017/auth-db`.

## How to Run the Project

1. Start MongoDB locally.
2. Run the backend server.
3. Run the frontend development server.
4. Open the frontend in the browser.
5. Register a user.
6. Test login and protected route behavior.

## API Purpose

Although the exact route files may differ based on implementation, the backend generally includes authentication-related API routes such as:

- `POST /api/auth/register`
- `POST /api/auth/login`
- Protected routes requiring JWT token validation

These routes help demonstrate practical backend architecture for authentication-based applications.

## Key Learning Outcomes

This project helps demonstrate:

- Building a React-based UI with reusable components
- Connecting frontend and backend applications
- Managing authentication flow with JWT
- Using MongoDB as a persistent datastore
- Structuring a MERN-style project cleanly for development and submission
- Handling environment variables for secure configuration

## UI and UX Notes

The interface is designed to be responsive and visually similar to a modern video browsing platform. The project can be extended with search, recommendations, video cards, channel pages, comments, likes, and watch-page functionality to make it more production-like.


## Troubleshooting

### User data not visible in MongoDB

- Confirm MongoDB is running.
- Check that the backend is connected successfully.
- Verify the database name is `auth-db`.
- Test the register API, not only login.
- Check MongoDB Compass for the `users` or required collection.
