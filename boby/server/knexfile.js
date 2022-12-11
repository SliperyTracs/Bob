const path = require("path");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "Bestappever123",
      database: "boby_db"
    },
    migrations: {
      directory: path.join(__dirname, "/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/seeds")
    }
  }
};
