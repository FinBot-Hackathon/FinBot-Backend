var models = require('../models');
module.exports.save = function (advertisementToBeCreated, callback) {
    models.Transaction.create(transactionToBeCreated).then(
        function (transaction) {
            return callback(null, transaction);
        });
};

module.exports.list = function (lt, gt, callback) {
    models.Transaction.findAll(
        {
            where: {
                createdAt: {
                    $lt: lt,
                    $gt: gt
                }
            }).then(function (transaction) {
        return callback(null, transaction);
    });
};

module.exports.details = function (advertisementId, callback) {
    models.Advertisement.findOne({
        where: {
            id: advertisementId
        },
        include: [{
            model: models.User
        }
        ]
    }).then(function (advertisement) {
        return callback(null, advertisement);
    });
};

module.exports.analysis = function (advertisement, size, callback) {
    var Analysis = {
        estimatedProduction: size * 5
    }
    return callback(null, Analysis);
};
module.exports.lastYearAnalysis = function (advertisement, callback) {
    var lastYearAnalysis = {
        lastYearEstimatedProduct: 20
    }
};