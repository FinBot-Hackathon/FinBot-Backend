var express = require('express');
var router = express.Router();
var controller = require('../controller/accountController');
router.get('/:id', controller.details);
router.get('/', controller.list);
router.post('/', controller.save());
module.exports = router;