const express = require("express");
const http = require("http");
const cors = require("cors");

const config = require("./config");
const errorHandler = require("./utils/errorHandler");
const { serverInit } = require("./utils/serverInit");
const { initDatabaseConnection } = require("./utils/dbConnection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes/index"));

app.use(errorHandler);

const server = http.createServer(app);

serverInit();
initDatabaseConnection();

// TODO: Init socket server here and then pass server to DB connection. So can start or stop server base on database connection. Currently not required.

server.listen(config.port, () => {
  console.log(`Server listing at ${config.port}.`);
});
