var models = require("../models");
var userRepo = require("../repository/userRepository");
var FieldName = require("../util/constants").FieldName;
var stringUtil = require("../util/stringUtil");

exports.signup = function(req, res, next) {
	try {
		var userToBeCreated = userRepo.userFromParams(req.body);
		userRepo.save(userToBeCreated, function(err, user) {
			res.generalResponse(err, user);
		});
	} catch (e) {
		res.generalResponse(e, null);
	}
};

exports.login = function(req, res, next) {
	try {
		var userName = req.query.username;
		var password = req.query.password;
		
		userRepo.findByPassword(userName, password, function(err, user) {
			if(user)
				res.generalResponse(err, [user]);
			else
				res.generalResponse(err, null);
		});
	} catch (e) {
		res.generalResponse(e, null);
	}
};

exports.list = function(req, res, next) {
	userRepo.list(req.params.groupId, function(err, users) {
		res.generalResponse(err, users);
	});
};

exports.deactivate = function(req, res) {
	userRepo.deactivate(req.authorizedUser, function(err, user) {
		res.generalResponse(err, user);
	});
};

exports.update = function(req, res) {
	var userToBeUpdated = userToBeUpdatedWithParams(req.body);
	userRepo.update(req.authorizedUser, userToBeUpdated, function(err, user) {
		res.generalResponse(err, user);
	});
};

userToBeUpdatedWithParams = function(params) {
	var user;
	if (!isNull(params[FieldName.USERNAME]))
		user.username = params[FieldName.USERNAME];
	if (!isNull(params[FieldName.NAME]))
		user.name = params[FieldName.NAME];
	if (!isNull(params[FieldName.SURNAME]))
		user.surname = params[FieldName.SURNAME];
	if (!isNull(params[FieldName.PHONE]))
		user.phone = params[FieldName.PHONE];
	if (!isNull(params[FieldName.BIRTHDAY]))
		user.birthday = params[FieldName.BIRTHDAY];
	return user;
}
isNull = function(param) {
	return stringUtil.isNull(param);
}
