# GymPass-style application.

## Description
A project applying SOLID principles and Test-Driven Development (TDD), inspired by the well-known application Gympass (Wellhub). This project utilizes TypeScript, Node.js, Fastify, Prisma, and Vitest to ensure a robust and scalable architecture, focusing on maintainability and efficient testing practices. The combination of these technologies enables the development of a high-performance API with a strong foundation in software engineering best practices.

## Requirements

Before starting, ensure that Node.js, pnpm and docker are installed on your machine. You can download Node.js [here](https://nodejs.org/), docker [here](https://docs.docker.com/get-docker/) and install `pnpm` globally with the command:

```bash
npm install -g pnpm
```
## Cloning the Repository

In your terminal, clone the repository using the command:

```bash
git clone [https://github.com/thalesantana/ecommerce-discount.git](https://github.com/thalesantana/gympass-style-app.git)
```

## Installing Dependencies
Navigate to the project directory:

```bash
cd gympass-style-app
```
## Install the project dependencies with pnpm:

```bash
pnpm install
```
## Create env file
Copy the file `env.example` and rename to `.env`

## Create Database

```bash
docker compose up -d
```

## Generate Prisma
```bash
npx prisma generate
```

## Starting the Project
To start the project in development mode, use the command:

```bash
npm run start:dev
```
## Technologies Used
- TypeScript: A superset of JavaScript that adds static typing.
- Node.js: A JavaScript runtime built on Chrome's V8 engine, used for building scalable network applications.
- Fastify: A web framework for Node.js focused on speed and low overhead, ideal for building APIs.
- Prisma: An ORM tool that simplifies database management with type-safe queries.
- Vitest: A fast and lightweight testing framework for TypeScript and JavaScript, used for unit and integration testing.

## Functional requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to obtain his/her check-in history;
- [x] It must be possible for the user to search for nearby gyms (10km);
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in to a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business rules 

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot check-in twice on the same day; 
- [x] The user cannot check in if he/she is not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after being created;
- [x] Check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

## Non-functional requirements

- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);
