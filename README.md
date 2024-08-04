## Getting Started

This is the project for user management system built with React and Mantine.

To get started, follow these steps:

copy .env.example to .env both in the backend and frontend

## Backend

The backend is built with NestJS and Prisma. It uses JWT authentication and authorization. The backend also provides an API for managing users, roles, permissions, departments, and staff.

To run the backend, follow these steps:
1. Install dependencies: `pnpm install`
2. Migrate the database: `pnpx prisma migrate reset -f`
3. Start the development server: `pnpm run dev`
4. Access the application at `http://localhost:3000/api`



## Frontend

The frontend is built with React and Mantine. It uses JSON Server for mocking API endpoints. The frontend also provides an interface for managing users, roles, permissions, departments, and staff.

To run the frontend, follow these steps:
1. Install dependencies: `pnpm install`
2. Start the development server: `pnpm run dev`
3. Access the application at `http://localhost:5173`

## Features

- User authentication and authorization
- Role-based access control
- CRUD operations for users, roles, permissions, departments, and staff

## Feature Testing

-Admin
email: super.admin@example.com
password: password
- admin can create, read, update, and delete users
- admin can create, read, update, and delete roles
- admin can create, read, update, and delete permissions
- admin can create, read, update, and delete departments
- admin can create, read, update, and delete staff

-Manager
email: manager@example.com
password: password
- manager can create, read, update users
- manager can create, read, update roles
- manager can create, read, update permissions
- manager can create, read, update departments
- manager can create, read, update staff

-User
email: user5@example.com
password: password
-user can read staff
-user can read departments
-user can read roles
-user can read permissions

