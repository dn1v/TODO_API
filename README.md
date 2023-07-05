# Todo API

There's a saying that you should have a TODO app on your GitHub profile, or you won't have luck as a developer. Lots of merge conflicts you'll have...
This is a simple Todo API built with Node.js, Express.js, and Prisma.

## Features

- User authentication
- CRUD operations for tasks
- CRUD operations for users

## Getting Started



### Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd todo_api`
3. Install dependencies: `npm install`

### Configuration

Create a `.env` file in the root directory of the project and add the following variables:

```plaintext
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

### Database Setup

1. Ensure that you have a compatible database (e.g., PostgreSQL) running.
2. Update the database connection details in the `.env` file.

### Datebase Migration

The application uses Prisma for database migrations. To create and apply database migrations you should: 

```bash
npx prisma migrate dev --name init
```

### Starting the API

Run the following command to start the API in development mode:

```bash
nodemon exec
```

## License

[MIT](https://choosealicense.com/licenses/mit/)