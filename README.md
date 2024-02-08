# miniature-funicular

## How to run this project?

This guide will walk you through the process of setting up and running a Test project.

### Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node.js package manager)
- [Docker](https://www.docker.com/), if you plan to use containerization for the database and RabbitMQ

### Setup Instructions

Follow these steps to set up the project:

1. **Install NestJS CLI**  
   The NestJS CLI is a command-line interface tool that helps you to initialize, develop, and maintain your NestJS applications. Install it globally via npm:
   ```sh
   npm install -g @nestjs/cli
   ```

2. **Install Project Dependencies**  
   Navigate to the project's root directory and run the following command to install all the necessary dependencies:
   ```sh
   npm install
   ```

3. **Start the Database and RabbitMQ**  
   If you are using Docker for your development environment, start the services using Docker Compose:
   ```sh
   docker compose up -d
   ```
   This will run the services defined in your `docker-compose.yml` file in detached mode.

4. **Build the Project**  
   Compile the TypeScript source code to JavaScript using the build script:
   ```sh
   npm run build
   ```

5. **Run the Application**  
   Start the application with:
   ```sh
   npm run start
   ```

After following these steps, the Test application should be running and accessible.
