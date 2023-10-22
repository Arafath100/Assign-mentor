# Mentor and Student Assigning with Database

This project implements a Node.js Express API for managing mentors and students using MongoDB as the database. It includes endpoints for creating mentors, students, assigning students to mentors, changing mentors, and retrieving mentor-related student information.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager)
- MongoDB
- Your MongoDB connection URL
- Postman or any API testing tool

### Installation
1. Clone this repository to your local machine.
2. Install project dependencies using npm:
     ```bash
     npm install body-parser express mongoose dotenv
  
3. Create a `.env` file in the root directory and add your MongoDB connection URL:
      ```bash
      DB_URL=your-mongodb-connection-url
      
4. Start the server:
      ```bash
      npm start

## Usage
You can now use the provided API endpoints to manage mentors and students. You can also use Postman or any other API testing tool to interact with the API.

## API Endpoints
- `POST /mentor`: Create a new mentor.
- `POST /student`: Create a new student.
- `POST /mentor/:mentorId/assign`: Assign students to a mentor.
- `PUT /student/:studentId/assignMentor/:mentorId`: Assign or change a mentor for a student.
- `GET /mentor/:mentorId/students`: Get all students assigned to a mentor.
- `GET /student/:studentId/pMentor`: Get the previous mentors of a student.

## Database Schema
- Mentor Schema:
- `name`: Mentor's name
- `students`: An array of student references

- Student Schema:
- `name`: Student's name
- `cMentor`: Current mentor reference
- `pMentor`: An array of previous mentor references

## Deployment
You can deploy the Express server to a hosting platform like Render. Make sure to set up environment variables for your deployment platform and update the MongoDB connection URL accordingly.

## Contributing
Contributions are welcome. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. 

Happy coding!

