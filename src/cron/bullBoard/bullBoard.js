const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const exampleQueue = require('../queues/exampleQueue');

function setupBullBoard(app) {
    const { router } = createBullBoard([new BullAdapter(exampleQueue)]);
    app.use('/bullboard', router);
}

module.exports = setupBullBoard;
