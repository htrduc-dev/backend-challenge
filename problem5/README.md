
# Problem 5 - A Crude Server

## Tech Stack

* Node.js
* ExpressJS
* TypeScript
* MySQL

## Installation

```bash
npm install
```

## Database

Create database:

```sql
CREATE DATABASE crude_server;
```

Create table:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'done') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Run

```bash
npm run dev
```

Server:

```
http://localhost:3000
```

## API Endpoints

### Create task

POST /tasks

### List tasks

GET /tasks

Filter by status:

GET /tasks?status=pending

### Get task

GET /tasks/:id

### Update task

PUT /tasks/:id

### Delete task

DELETE /tasks/:id
