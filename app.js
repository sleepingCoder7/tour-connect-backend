const express = require("express");
const cors = require("cors"); 
const tourRoutes = require("./routes/tourRoutes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig.js");
const logger = require("./config/logger.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(logger)

app.use("/tour", tourRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;