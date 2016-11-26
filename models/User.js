var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		userType : DataTypes.INTEGER,
		username : DataTypes.STRING,
		password : DataTypes.STRING,
		name : DataTypes.STRING,
		surname : DataTypes.STRING,
		phone : DataTypes.STRING,
		address: DataTypes.STRING,
		userNo: DataTypes.STRING,
		token : {
			type : DataTypes.STRING,
			allownull : false,
			unique : true
		},
		tokenExpireDate : {
			type : DataTypes.DATE,
			defaultValue : setTokenExpiredDate
		},
		active : {
			type : Sequelize.BOOLEAN,
			allowNull : false,
			defaultValue : true
		}

	}, {
		classMethods : {
			associate : function(models) {
				User.belongsToMany(models.Account, {through: models.UserAccount});
			}
		}
	});
	return User;
};
// will change future if needed
setTokenExpiredDate = function() {
	var date = new Date();
	return null;
};