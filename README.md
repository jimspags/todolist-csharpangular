# ToDoList App

## Overview
ToDoList is a simple web application that allows users to manage their tasks. It consists of a C# Web API backend, an AngularJS frontend, and utilizes Tailwind CSS for styling. MySQL is used as the database for storing task data.

## Features
- Create, Read, Update, and Delete (CRUD) tasks.
- User-friendly interface for managing tasks.
- Backend API for handling task data.

## Setup Instructions
To set up the ToDoList app, follow the instructions below:

### Prerequisites
Before starting the setup process, ensure that you have the following prerequisites installed:
- .NET SDK (for C# Web API)
- Node.js and npm (for AngularJS)
- MySQL

### Backend Setup (C# Web API)
1. Clone the repository from GitHub to your local machine.
2. Navigate to the `backend` directory.
3. Open the solution file (`ToDoList.sln`) in Visual Studio.
4. Build the solution to restore dependencies and compile the project.
5. Ensure that your MySQL connection string is correctly configured in the `appsettings.json` file.
6. Run the migration commands to apply the database migrations:
7. Start the backend server by running the project.

### Frontend Setup (AngularJS)
1. Navigate to the `frontend` directory.
2. Install the required npm packages by running:
3. Update the API base URL in the AngularJS code to match your backend server's URL.
4. Build the AngularJS project by running:
5. Once the build process is complete, you can serve the AngularJS app using a web server of your choice.

## Usage
After completing the setup process, you can access the ToDoList app by navigating to the URL where your frontend server is hosted. You can then perform CRUD operations on your tasks through the user interface.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Authors
- [James Paul Paguirigan](https://github.com/jimspags)

