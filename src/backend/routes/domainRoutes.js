const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');
const AuthMiddleware = require("../middlewares/authMiddleware");

router.get('/domains', domainController.getDomains);
router.get('/filltered-domains',AuthMiddleware.authenticateToken, domainController.getFillteredDomains);
router.get('/export-csv', domainController.exportCsv);

router.post('/resync-domains',AuthMiddleware.authenticateToken, domainController.resynchronizeDomains);

router.post('/verify-webshop-sync',AuthMiddleware.authenticateToken, domainController.verifyWebshopSync);

router.post('/domains/:domainId/resync',AuthMiddleware.authenticateToken, domainController.resynchronizeDomainById);

router.post('/domains/:domainId/verify-webshop-sync',AuthMiddleware.authenticateToken, domainController.verifyWebshopSyncById);

router.get('/domains/:domainId', domainController.getDomainById);
router.get('/domains/:domainId/get', domainController.getDataForSpecificDomain);
router.put('/domains/:domainId/set', domainController.setDataForSpecificDomain);
router.put('/domains/:domainId', domainController.setDomainUpdate);
router.post('/domains/create', domainController.createDomain);
router.post('/url_domains', domainController.getDomainByUrl);
router.delete('/domains/delete', domainController.deleteDomain);
router.put('/domains/update/:domainId', domainController.updateDomain);

module.exports = router;
