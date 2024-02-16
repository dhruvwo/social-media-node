const express = require("express");
const http = require("http");
const cors = require("cors");

const { initDatabaseConnection } = require("./utils/dbConnection");
const config = require("./config");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes/index"));

app.use(errorHandler);

const server = http.createServer(app);

// TODO: Init socket server here and then pass server to DB connection. So can start or stop server base on database connection. Currently not required.

// initDatabaseConnection()
//   .then(() => {
server.listen(config.port, () => {
  console.log(`Server listing at ${config.port}.`);
});
// })
// .catch(() => {
//   server.close();
//   console.log("Server stopped.");
// });
