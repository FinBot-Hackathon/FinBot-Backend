var validator = require('validator');
module.exports.isNull = function(param) {
	return validator.isNull(param);
}
module.exports.getDummyMontlyData = function() {

	var monthly1 = {};
	monthly1.year = 2015;
	monthly1.estimatedProduct = getRandomNumberForMonth();

	var monthly2 = {};
	monthly2.year = 2014;
	monthly2.estimatedProduct = getRandomNumberForMonth();

	var monthly3 = {};
	monthly3.year = 2013;
	monthly3.estimatedProduct = getRandomNumberForMonth();

	var monthly4 = {};
	monthly4.year = 2012;
	monthly4.estimatedProduct = getRandomNumberForMonth();

	var montlyList = [ monthly1, monthly2, monthly3, monthly4 ]

	return montlyList;
};
getRandomNumberForMonth = function() {
	return getRandomNumberBetweenNumbers(10, 100);
};
getRandomNumberBetweenNumbers = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};