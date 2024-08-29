const express = require('express');
const router = express.Router();
const authRouter = require('./authRoutes');
const configRouter = require('./configRoutes');
const domainRouter = require('./domainRoutes');

router.use('/auth', authRouter);
router.use('/config', configRouter);
router.use('/', domainRouter);

module.exports = router;
