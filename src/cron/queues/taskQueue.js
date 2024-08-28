const Queue = require('bull');
const { redisConfig } = require('../config/config');

const taskQueue = new Queue('taskQueue', {
    redis: redisConfig,
});

module.exports = taskQueue;
