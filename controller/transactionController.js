var models = require("../models");
var transactionRepo = require("../repository/transactionRepo");
var FieldName = require("../util/constants").FieldName;
var stringUtil = require("../util/stringUtil");

module.exports.save = function (req, res, callback) {
    transactionRepo.save(req.body, callback);
};

module.exports.list = function (req, res, next) {
    transactionRepo.list(req.authorizedUser,req.params.lt, req.param.gt, function (err, accounts) {
        res.generalResponse(err, accounts);
    });
};

module.exports.details = function (req, res, next) {
    var accountId = req.params.id;
    transactionRepo.details(accountId, function (err, advertisement) {
        res.generalResponse(err, [advertisement]);
    });
};