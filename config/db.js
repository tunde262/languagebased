// MongoDB library for nodeJS
const mongoose = require('mongoose');

// database connection link
const dbLink = 'mongodb+srv://TundeAdepitan:adepitan1@cluster0.hkdsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// DB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(dbLink, { // Connect to DB thru dbLink variable
            // connection attributes to remove compiler errors bel
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            autoIndex: false
        });

        // Display in console when DB is connected 
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message);

        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;