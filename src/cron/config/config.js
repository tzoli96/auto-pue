module.exports = {
    port: process.env.PORT || 3003,
    redisConfig: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
    },
};
