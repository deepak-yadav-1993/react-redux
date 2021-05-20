const response = require("./../common");

const healthResponse = {
	...response,
	status: "ok",
	message: "The database service is up and running",
};

module.exports = (app) => {
	app.get("/api", (req, res) => {
		res.send(healthResponse);
	});

	app.get("*", (req, res) => {
		//The default route
		res.send(response);
	});
};
