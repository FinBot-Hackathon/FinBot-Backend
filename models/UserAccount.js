var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var UserAccount = sequelize.define('UserAccount', {
           userRole: DataTypes.STRING
    });
	return UserAccount;
}