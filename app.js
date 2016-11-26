var express = require('express');
var models = require('./models');
var appConfig = require('./config/appConfig.js');
var core = require('./core/express.js');

var app = express();
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
require("./core/express")(app);
models.sequelize.sync().then(
		function() {
			app.listen(3000, '0.0.0.0', function() {
			// print a message when the server starts listening
			console.log("server starting on ");
			});
		});
