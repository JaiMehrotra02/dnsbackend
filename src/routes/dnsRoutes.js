const express = require('express');
const dnsController = require('../controllers/dnsController');

const router = express.Router();

router.get('/', dnsController.getAllRecords);
router.post('/', dnsController.addRecord);

router.get('/:id', dnsController.getRecordById);


router.put('/:id', dnsController.updateRecord);


router.delete('/:id', dnsController.deleteRecord);


module.exports = router;
