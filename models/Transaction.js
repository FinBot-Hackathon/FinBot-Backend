var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var Transaction = sequelize.define('Transaction', {
            amount: DataTypes.DOUBLE
        },
        {
            classMethods: {
                associate: function (models) {
                        Transaction.hasOne(models.TransactionType, {}),
                        Transaction.belongsTo(models.User, {as: "to"}),
                        Transaction.belongsTo(models.User, {as: "from"})
                }
            }
        }
    );
	return Transaction;
}