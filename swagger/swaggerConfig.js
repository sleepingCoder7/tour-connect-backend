const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tour Connect API",
            version: "1.0.0",
            description: "API documentation for Tour Connect backend",
            contact: {
                name: "Tour Connect Team",
                email: "durgaprasadkar1998.dp@gmail.com",
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT",
            },
        },
        servers: [
            {
                url: process.env.BASE_URL || "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;