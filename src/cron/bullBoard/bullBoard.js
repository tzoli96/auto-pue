const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const taskQueue = require('../queues/taskQueue');

function setupBullBoard(app) {
    const { router } = createBullBoard([new BullAdapter(taskQueue)]);
    app.use('/bullboard', router);
}

module.exports = setupBullBoard;
