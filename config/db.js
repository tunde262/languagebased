const mongoose = require('mongoose');

// database connection
const dbLink = 'mongodb+srv://TundeAdepitan:adepitan1@cluster0.hkdsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(dbLink, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false
        });

        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message);

        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;