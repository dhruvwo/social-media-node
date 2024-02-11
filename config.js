require("dotenv").config();

const environment = process.env.ENVIRONMENT || "local";

const local = {
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "superSecret",
};

const development = {
  port: process.env.PORT || 5000,
  dbURL: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "superSecret",
};

const config = {
  local,
  development,
};

module.exports = config[environment];
