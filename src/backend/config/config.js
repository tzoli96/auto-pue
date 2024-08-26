module.exports = {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET || 'your_default_jwt_secret',
};
