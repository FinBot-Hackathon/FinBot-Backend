module.exports = function(message, extra) {
	var err = Error.call(this, message);
	err.name = "UserNotFoundException";
	err.extra = extra;
	return err;
};