const mongoose = require('mongoose');

async function connectToDatabase(uri) {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
        process.exit(1); // Lépj ki, ha nem tud csatlakozni
    }
}

module.exports = connectToDatabase;
