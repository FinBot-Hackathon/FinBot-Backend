/**
 * New node file
 */
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	var Advertisement = sequelize.define('Advertisement', {
		area : DataTypes.STRING,
		productType : DataTypes.STRING,
		seedDate : DataTypes.DATE,
		harvestDate : DataTypes.DATE,
		active : {
			type : Sequelize.BOOLEAN,
			allowNull : false,
			defaultValue : true
		}
	}, {
		classMethods : {
			associate : function(models) {
				Advertisement.belongsTo(models.User, {
					foreignKey : {
						allowNull : false
					}
				});
			}
		}
	});
	return Advertisement;
};
