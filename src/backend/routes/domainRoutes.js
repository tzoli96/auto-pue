const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');
const AuthMiddleware = require("../middlewares/authMiddleware");

router.get('/domains',AuthMiddleware.authenticateToken, domainController.getDomains);

router.post('/resync-domains',AuthMiddleware.authenticateToken, domainController.resynchronizeDomains);

router.post('/verify-webshop-sync',AuthMiddleware.authenticateToken, domainController.verifyWebshopSync);

router.post('/domains/:domainId/resync',AuthMiddleware.authenticateToken, domainController.resynchronizeDomainById);

router.post('/domains/:domainId/verify-webshop-sync',AuthMiddleware.authenticateToken, domainController.verifyWebshopSyncById);

router.get('/domains/:domainId', domainController.getDomainById);
router.post('/domains/create', domainController.createDomain);
router.delete('/domains/delete', domainController.deleteDomain);
router.put('/domains/update/:domainId', domainController.updateDomain);

module.exports = router;
