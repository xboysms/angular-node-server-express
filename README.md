# Task Management Application

This is a full‑stack Task Management Application built using Angular for the frontend and Node.js/Express for the backend. The application provides:

- **Task CRUD**: Create, read, update, and delete tasks.
- **JWT Authentication**: Secure user registration and login.
- **Task List**: Tasks are sorted by due date.
- **Protected Endpoints**: Only authenticated users can manage tasks.

## Technologies
- **Backend**: Node.js, Express, TypeScript, JSON Web Tokens (JWT)
- **Frontend**: Angular (v15+), TypeScript, Angular Router, Angular Forms
- **Data Persistence**: In‑memory dummy data for demonstration (replace with a database for production).

## Setup Instructions

### Backend
1. **Clone the repository and navigate to the backend folder:**
    ```bash
    git clone <repo-url>
    cd task-management-app/backend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Create a `.env` file** in the backend root with:
    ```
    PORT=3000
    JWT_SECRET=your_secret_key
    ```
4. **Run the backend server:**
    ```bash
    npm run dev
    ```
   The API will run on `http://localhost:3000`.

### Frontend
1. **Navigate to the frontend folder:**
    ```bash
    cd ../frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Configure API URL** in `src/environments/environment.ts` (set `apiUrl: 'http://localhost:3000/api'`).
4. **Run the Angular application:**
    ```bash
    ng serve
    ```
   The app will run on `http://localhost:4200`.

## API Endpoints (Backend)

### **Authentication**
- **POST** `/api/auth/register`  
  Request Body: `{ "username": "user1", "password": "pass123" }`

- **POST** `/api/auth/login`  
  Request Body: `{ "username": "user1", "password": "pass123" }`  
  Response: `{ "token": "JWT_TOKEN_HERE" }`

### **Task Operations (Protected)**
- **POST** `/api/tasks`  
  Request Body: `{ "title": "Task Title", "description": "Task Description", "dueDate": "2023-12-31" }`

- **GET** `/api/tasks`  
  Returns list of tasks for the authenticated user, sorted by due date.

- **GET** `/api/tasks/:id`  
  Returns details of a specific task.

- **PUT** `/api/tasks/:id`  
  Request Body: Updated task details.

- **DELETE** `/api/tasks/:id`  
  Deletes a task.

## Diagram: Flow of Execution

```plaintext
          +------------------+
          |   User Action    |
          +------------------+
                   |
                   v
     +-----------------------------+
     | Angular Frontend            |
     |  - Login/Register           |
     |  - Create/Edit/Delete Tasks |
     |  - Display Task List        |
     +-----------------------------+
                   |
                   v
        +-------------------------+
        | HTTP REST API Calls     |
        | (JWT in headers)        |
        +-------------------------+
                   |
                   v
     +-------------------------------+
     | Node.js/Express Backend       |
     | - Auth Controller (JWT)       |
     | - Task Controller (CRUD)      |
     +-------------------------------+
                   |
                   v
     +-------------------------------+
     | In-Memory Data Store          |
     | (Replace with DB for prod)    |
     +-------------------------------+
