require("dotenv").config(); // Load environment variables

const express = require("express"); // Express framework for Node.js
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const cookieParser = require("cookie-parser"); // Middleware to parse cookies
const expressSession = require("express-session"); // Middleware for session management
const flash = require("connect-flash"); // Middleware for displaying flash messages
const http = require("http"); // Node.js HTTP module
const cors = require("cors"); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const expressRateLimiter = require("express-rate-limit"); // Middleware for rate limiting
const morgan = require("morgan"); // HTTP request logger middleware
const path = require("path"); // Node.js module for handling file paths
const passport = require("./configurations/passport"); // Passport.js for authentication
const jwt = require("jsonwebtoken"); // Import jsonwebtoken package for JWT functionality
const hbs = require("hbs"); // Handlebars.js view engine

// Express application
const app = express();

// HTTP server
const server = http.createServer(app);

// Socket.io server
const { Server } = require("socket.io");
const io = new Server(server);

// Database models
const User = require("./models/user");
const Message = require("./models/message");

// Middleware setup
app.set("view engine", "hbs"); // Set Handlebars as the view engine
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Static file serving
app.use("/public", express.static(path.join(__dirname, "../public")));

// Session management middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Rate limiting middleware
const limiter = expressRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Flash messages middleware
app.use(flash());

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parsing middleware
app.use(cookieParser());

// CORS middleware
app.use(cors());

// HTTP request logging middleware
app.use(morgan("tiny"));

// Routes setup
const pagesRoutes = require("./dependencies/pages");
const authRoutes = require("./dependencies/auth");
app.use(pagesRoutes);
app.use(authRoutes);

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.clearCookie("_secure");
      res.redirect("/login");
    }
  });
});

// Socket.io connection handling
io.on("connection", async (socket) => {
  try {
    // Extract user information from socket handshake
    const token = socket.handshake.headers.cookie.split("_secure=")[1];
    const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decrypted._id);
    user.status = "online";
    await user.save();

    // New message event
    socket.on("new message", async (data) => {
      const newMsg = await Message.create({
        content: data.content,
        sender: data._id,
      });
      io.emit("new message", {
        sender: user,
        content: data.content,
        messageId: newMsg._id,
      });
    });

    // User disconnect event
    socket.on("disconnect", async () => {
      user.status = "offline";
      await user.save();
    });

    // Delete for me event
    socket.on("delete for me", async (data) => {
      const message = await Message.findById(data._id);
      message.deleteForMe = true;
      await message.save();
      io.emit("delete for me", {
        sender: user,
      });
    });

    // Delete for everyone event
    socket.on("delete for everyone", async (data) => {
      await Message.findByIdAndDelete(data._id);
      io.emit("delete for everyone", {
        sender: user,
      });
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Start server
const port = process.env.PORT;
const dbConnector = require("./configurations/database");
server.listen(port, () => {
  dbConnector;
  console.log(`Chat app is live at ${port}`);
});
