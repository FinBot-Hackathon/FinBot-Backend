var hat = require('hat');
var models = require('../models');
var User = require('../models').User;
var UserNotFoundException = require("../util/exceptions/UserNotFoundException");
var FieldName = require("../util/constants").FieldName;

module.exports.findByToken = function(token, callback) {
	User.findOne({
		where : {
			token : token,
			active : true
		}
	}).then(function(user) {
		try {
			if (user) {
				return callback(null, user);
			} else {
				throw new UserNotFoundException("User not found", null);
			}
		} catch (e) {
			return callback(e, null);
		}
	});
};
module.exports.save = function(userToBeCreated, callback) {
	models.User.create(userToBeCreated).then(function(user) {
		return callback(null, user);
	});
};

module.exports.findByPassword = function(usernameParam, passwordParam, callback) {
	models.User.findOne({
		where : {
			username : usernameParam,
			password : passwordParam
		}
	}).then(function(user) {
		try {
			if (user)
				return callback(null, user);
			else
				throw new UserNotFoundException("User not found", null);
		} catch (e) {
			return callback(e, null);
		}
	});
};
module.exports.list = function(groupId, callback) {
	models.Group.findOne({
		where : {
			id : groupId
		}
	}).then(function(group) {
		if (group) {
			group.getUsers().then(function(users) {
				return callback(null, users);
			});
		}
	});
};

module.exports.deactivate = function(userToBeDeactived, callback) {
	userToBeDeactived.updateAttributes({
		active : false
	}).then(function(err, user) {
		return callback(err, user);
	});
};

module.exports.update = function(userPrev, usertToBeUpdated, callback) {
	userPrev.updateAttributes(userToBeUpdated).then(function(user) {
		return callback(null, user);
	});
};

module.exports.userFromParams = function(params) {
	var user = initNewUser();
	user.username = params[FieldName.USERNAME];
	user.name = params[FieldName.NAME];
	user.surname = params[FieldName.SURNAME];
	user.phone = params[FieldName.PHONE];
	user.password = params[FieldName.PASSWORD];
	return user;
};
initNewUser = function() {
	return {
		token : hat()
	}
};