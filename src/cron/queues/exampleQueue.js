const Queue = require('bull');
const { redisConfig } = require('../config/config');

const exampleQueue = new Queue('exampleQueue', {
    redis: redisConfig,
});

module.exports = exampleQueue;
