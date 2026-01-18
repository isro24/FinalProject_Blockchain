const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');



router.get('/certificates', verifyController.getAllCertificates);
router.get('/verify/:id', verifyController.verifyCertificate);
router.post('/revoke/:id', verifyController.revokeCertificate);

module.exports = router;