const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./app/api/auth/router");
const moviesRouter = require("./app/api/movies/router");
const URL = `/api/v1`;

const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to server" });
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, moviesRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger Documentation",
      version: "0.1.0",
      description: "simple documentation api for homework 8",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./app/api/movies/*.js"],
  //   apis: [path.join(process.cwd(), "/routes/*.js")],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
