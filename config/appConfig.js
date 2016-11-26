var arg = require('optimist').argv;
var config = {}

if (typeof (arg.env) == "undefined") {
	/*
	 * console.log("Please select an environment with --env parameter. Options
	 * are dev, stage and prod."); process.exit(1);
	 */
	arg.env = "development"; // for setting test environment
} else {
	if (arg.env == "development") {
		config = {
			port : appEnv.port || 3000,
			env : "dev",
			appVersion: "v0.1"
		// mail : { service : "Zoho", host: "smtp.zoho.com", port: 465, ssl:
		// true, auth: { user : "info@lost-found.co", pass :
		// "LostAndFound20!5" } },
		// redis : { host: process.env.BACKER_REDIS_HOST, port:
		// process.env.BACKER_REDIS_PORT }
		};
	} else if (arg.env == "production") {
		config = {
			port : appEnv.port || 3000,
			env : "prod",
			appVersion: "v0.1"
		// mail : { service : "Zoho", host: "smtp.zoho.com", port: 465, ssl:
		// true, auth: { user : "info@lost-found.co", pass :
		// "LostAndFound20!5" } },
		// redis : { host: process.env.BACKER_REDIS_HOST, port:
		// process.env.BACKER_REDIS_PORT }
		};
	} else {
		console.log("No valid parameter for --env. dev or live.");
		process.exit(1);
	}
	console.log("Loading config for environment: " + arg.env);
	console.log("Starting with following settings:");
	console.log(config);
}

module.exports = config;