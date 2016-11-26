/**
 * New node file
 */

/**
 * authentication
 */
var validator = require('validator');
var FieldName = require('../util/constants').FieldName;
var userRepo = require('../repository/userRepository');
var UserNotFoundException = ("../util/exceptions/UserNotFoundException");
module.exports.authenticate = function(req, res, next) {
	var token = req.get(FieldName.TOKEN);
	if (validator.isNull(token))
		return res.servisistErrorResponse("Token is missing", 400);
	userRepo.findByToken(token, function(user) {
		if (!user) {
			return res.servisistErrorResponse(err.message, 500);
		} else {
			req.authorizedUser = user;
			return next();
		}
	});
}
