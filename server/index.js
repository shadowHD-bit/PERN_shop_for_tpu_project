//Import libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./utils_json/open_api.json");

const fileUpload = require("express-fileupload");

//Import connection data DataBase
const sequelize = require("./utils/dataBase");

//Import Models DataBase
const models = require("./models/models");

//Import main router
const router = require("./routes/index");

//Import middleware
const errorHandler = require("./middleware/ErrorHandlingMidleWare");

const path = require("path");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Read port local server
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "static_review")));
app.use(express.static(path.resolve(__dirname, "static_avatar")));
app.use(express.static(path.resolve(__dirname, "static_brand_and_type")));

app.use(fileUpload({}));
app.use("/api", router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SHOP.RU",
      description: "Закрытое API сервиса SHOP.RU",
      version: "v. 1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Сервер Backend-части сервиса SHOP.RU",
      },
    ],
  },
  apis: ["./routes/**.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//The lastMIdllewares
app.use(errorHandler);

//Function start Server
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
