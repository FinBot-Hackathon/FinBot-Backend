var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var Account = sequelize.define('Account', {
            type: DataTypes.STRING,
            amount: DataTypes.DOUBLE,
            accountNumber: {
                type: DataTypes.STRING,
                allownull: false,
                unique: true
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    Account.belongsToMany(models.User, {through: models.UserAccount})
                }
            }
        }
    );
    return Account;
}