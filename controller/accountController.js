var models = require("../models");
var accountRepo = require("../repository/accountRepository");
var FieldName = require("../util/constants").FieldName;
var stringUtil = require("../util/stringUtil");

module.exports.save = function (req, res, callback) {
    accountRepo.save(req.body, callback);
};

module.exports.list = function (req, res, next) {
    accountRepo.list(req.authorizedUser, function (err, accounts) {
        res.generalResponse(err, accounts);
    });
};

module.exports.details = function (req, res, next) {
    var accountId = req.params.id;
    accountRepo.details(accountId, function (err, advertisement) {
        res.generalResponse(err, [advertisement]);
    });
};