const express = require('express');

// DB
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Routes
const auth = require('./routes/authRoutes');

const app = express();

connectDB();

// Body parser middleware
app.use(express.json({ extended: false }));

app.use(cookieParser());

// Use Routes
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));