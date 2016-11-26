var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var TransactionSubType = sequelize.define('TransactionSubType', {
            name: DataTypes.STRING
        },
        {
            classMethods: {
                associate: function (models) {
                    TransactionSubType.belongsToMany(models.TransactionType, {through: models.TypeSubType})
                }
            }
        }
    );
	return TransactionSubType;
}