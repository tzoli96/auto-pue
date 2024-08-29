const express = require('express');
const router = express.Router();
const ConfigurationController = require('../controllers/configurationController');

router.post('/set', ConfigurationController.setConfig);
router.post('/get', ConfigurationController.getConfig);

module.exports = router;
