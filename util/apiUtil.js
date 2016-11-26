/**
 * Adding Servisist response functions
 */
module.exports.addServisistResponseMethods = function(req, res, next) {
	res.servisistSuccessResponse = function(message, data) {
		res.status(200);
		return res.json({
			status : "success",
			message : message,
			data : data
		});
	};
	res.servisistErrorResponse = function(message, httpCode, data) {
		res.status(httpCode);
		if (!data)
			data = null;
		return res.json({
			status : "fail",
			message : message,
			data : data
		});
	};
	res.generalResponse = function(err, data) {
		if (data)
			return res.servisistSuccessResponse("success", data);
		else if (err)
			return res
					.servisistErrorResponse(err.message, 500, null);
		else
			return res.servisistErrorResponse("No record found", 501, null);
	};
	res.generalResponseCallback = function(err, data) {
		res.generalResponse(err, data);
	};
	next();
};
module.exports.isJSONString = function(string) {
	try {
		JSON.parse(string);
	} catch (e) {
		return false;
	}
	return true;
};
