var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var TransactionType = sequelize.define('TransactionType', {
            name: DataTypes.STRING
        },
        {
            classMethods: {
                associate: function (models) {
                    TransactionType.hasMany(models.TransactionSubType, {})
                    TransactionType.hasMany(models.Transaction, {})
                }
            }
        }
    );
	return TransactionType;
}