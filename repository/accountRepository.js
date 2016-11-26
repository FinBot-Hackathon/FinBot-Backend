var models = require("../models");

module.exports.list = function (user, callback) {
    user.getAccounts({
        where: {
            active: true
        }
    }).then(function (accounts) {
        return callback(null, accounts);
    });
}
module.exports.details = function (accountId, callback) {
    models.Account.findOne({
        where: {
            id: accountId
        },
        include: [{
            model: models.User
        }]
    }).then(function (account) {
        return callback(null, account);
    });
}
module.exports.save = function(accountToBeCreated, callback){
    models.Account.create(accountToBeCreated).then(function(account){
        return callback(null, account);
    });
}