const express = require("express");
const port = 3000;
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
require("./endpoints")(app);
require(`./src/routes/getRoutes`)(app);
