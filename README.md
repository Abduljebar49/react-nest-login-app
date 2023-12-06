# Project Name

## Description

This repository contains two folders: `nest-backend` and `react-frontend`. The project demonstrates authentication features on the React frontend, including login, signup, and validation. The backend, built with NestJS MongoDB, Mongoose, JWT, bycrpt and others, provides three main routes for authentication: `/api/auth/login`, `/api/auth/signup`, and `/api/auth/profile`.

The system uses JWT for token generation and bcrypt for password encryption.

## Getting Started

Follow the instructions below to get started with the project.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (Make sure you have a connection string)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Navigate to the project root:

   ```bash
   cd your-repository
   ```

3. Install dependencies for the backend (NestJS):

   ```bash
   cd nest-backend
   npm install
   ```

4. Install dependencies for the frontend (React):

   ```bash
   cd ../react-frontend
   npm install
   ```

## Running the Backend

To run the backend, you need to create a `.env` file in the `nest-backend` directory with the following content:

```env
MONGODB=your-mongodb-connection-string-here
JWT_SECRET=enter-your-secrets-here
```

Replace `your-mongodb-connection-string-here` with your actual MongoDB connection string and set a secure value for `JWT_SECRET`.

Now, you can start the backend:

```bash
cd nest-backend
npm run start:dev
```

The backend will be accessible at `http://localhost:3000`.

## Running the Frontend

To run the frontend, navigate to the `react-frontend` directory and start the React app:

```bash
cd ../react-frontend
npm run start
```

The React app will be accessible at the port in console.

Feel free to explore the authentication features in the React app and the authentication routes in the NestJS backend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
