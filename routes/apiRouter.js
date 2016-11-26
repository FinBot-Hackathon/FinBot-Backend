var express = require('express');
var router = express.Router();
var ApiUtil = require('../util/apiUtil');
var UserAuth = require('../middleware/userApiAuth');
var UserRouter = require('./userRouter');
var userContr = require('../controller/userController');
var accountRouter = require('./accountRouter');

// custom response methods
router.use('/*', ApiUtil.addServisistResponseMethods);

router.post('/users', userContr.signup);
router.get('/users/login', userContr.login);

router.use('/*', UserAuth.authenticate);
router.use('/users', UserRouter);
router.use('/accounts', accountRouter);
module.exports = router;