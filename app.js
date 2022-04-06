let express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// DB
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Routes
// const auth = require('./routes/api/auth');

let app = express();

connectDB();

// Body parser middleware
app.use(express.json({ extended: false }));

// middleware
app.use(express.static('public'));

// Use Routes
// app.use('/api/auth', auth);

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

