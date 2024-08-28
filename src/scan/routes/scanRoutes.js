const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');

router.get('/resync-domains', scanController.resynchronizeDomains);
router.get('/verify-webshop-sync', scanController.verifyWebshopSync);
router.get('/resync-domains/:id', scanController.resynchronizeDomainById);
router.get('/verify-webshop-sync/:id', scanController.verifyWebshopSyncById);

module.exports = router;
