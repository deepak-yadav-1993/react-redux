const express = require("express");
const mongoose = require("mongoose");

const app = express();

const swaggerUi = require("swagger-ui-express");
const endPoint = require("./endpoints");
const getRoutes = require("./src/routes/getRoutes");
const swaggerFile = require("./swagger_output.json");

const port = process.env.SERVER_PORT;
const dbPassword = process.env.DBPWD;
const dbURI = `mongodb+srv://deepak:${dbPassword}@deepak-demo.g5azr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectToDb = async () => {
	try {
		const dbConnection = await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
		app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
		endPoint(app);
		getRoutes(app);
	} catch (err) {
		console.trace("Error Message\n", err?.message, "\nErr\n", err);
	}
};

connectToDb();
