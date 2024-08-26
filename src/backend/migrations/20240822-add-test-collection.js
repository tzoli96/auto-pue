const mongoose = require('mongoose');

module.exports = {
    up: async function() {
        await mongoose.connection.createCollection('users');
        console.log('Users collection created');
    },
    down: async function() {
        await mongoose.connection.dropCollection('users');
        console.log('Users collection dropped');
    }
};
