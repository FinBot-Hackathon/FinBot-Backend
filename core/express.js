var http = require('http');
var path = require('path');
// var morgan = require('./morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var apiRouter = require('../routes/apiRouter');
module.exports = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	// Router setup
	app.use('/api/v0.1', apiRouter);
}