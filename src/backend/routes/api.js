const express = require('express');
const router = express.Router();
const authRouter = require('./authRoutes');
const domainRouter = require('./domainRoutes');

router.use('/auth', authRouter);
router.use('/', domainRouter);

module.exports = router;
