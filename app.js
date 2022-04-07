// Import express to create server
const express = require('express');

// DB connection file
const connectDB = require('./config/db');

// auth routes file
const auth = require('./routes/authRoutes');

// Initialize express server
const app = express();

connectDB();

// Body parser middleware
app.use(express.json({ extended: false }));

// Server endpoints (i.e. localhost:5000/api/auth)
app.use('/api/auth', auth);

// Server Port #
const port = 5000;

// Launch|listen to Server
app.listen(port, () => console.log(`Server running on port ${port}`));