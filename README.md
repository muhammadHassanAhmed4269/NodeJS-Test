Chat App

Overview
The Chat App is a real-time messaging platform that allows users to communicate with each other instantly. Users can send messages, receive messages, and delete messages either for themselves or for everyone in the conversation. The app provides a seamless and interactive chatting experience for users.

Design Choices
Technologies Used:
Node.js: Backend server environment for handling server-side logic and real-time communication using Socket.IO.
Express.js: Web application framework for building RESTful APIs and handling HTTP requests and responses.
MongoDB: NoSQL database for storing user data, messages, and other application data.
Socket.IO: JavaScript library for real-time bidirectional event-based communication between clients and the server.
Passport.js: Authentication middleware for Node.js applications, used for user authentication and authorization.
Bootstrap: Frontend framework for designing responsive and mobile-first web applications.
Handlebars (hbs): Templating engine for generating dynamic HTML content on the server side.

Architecture
The project follows a client-server architecture, where the frontend interacts with the backend server through HTTP requests and WebSocket connections for real-time communication. The backend server handles authentication, message processing, and database operations, while the frontend provides a user-friendly interface for interacting with the application.

Setup Instructions
Prerequisites
Node.js and npm installed on your machine.
MongoDB installed and running locally or accessible remotely.
Internet connection for installing dependencies.

Installation
Clone the repository to your local machine:
git clone https://github.com/your-username/chat-app.git
Navigate to the project directory:
cd chat-app
Install dependencies using npm:
npm install

Configuration
Create a .env file in the root directory of the project.
Add the following environment variables to the .env file:
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/chat
SESSION_SECRET_KEY=d29b0ac7aabadcb35faf792e4e23dbee5851abc9461989bcf90ea12cc3f5076a
JWT_SECRET_KEY=e132c52152899e6971257083126ad45c59ddd74eff66cad0709374f33179126c

Running the Application
Start the backend server:
npm start
Open your web browser and navigate to http://localhost:3000 to access the Chat App.

Usage
Register/Login: Users can create an account or log in using their credentials.
Chat Interface: Users can send and receive messages in real time with other users.
Message Deletion: Users can delete their own messages or delete messages for everyone in the conversation.
Logout: Users can log out of their accounts to end their session.

Contributing
We welcome contributions from the community to improve and enhance the Chat App. If you'd like to contribute, please follow these steps:

Fork the repository on GitHub.
Create a new branch for your feature or bug fix.
Make your changes and commit them with descriptive messages.
Push your changes to your fork.
Submit a pull request to the main branch of the original repository.
License
This project is licensed under the MIT License.

Contact
For any inquiries or support regarding the Chat App, please contact hassan.m.8537@gmail.com.

Feel free to modify and expand upon this README template to include additional details specific to your project. Good luck with your Chat App! If you have any further questions or need assistance, feel free to ask.


