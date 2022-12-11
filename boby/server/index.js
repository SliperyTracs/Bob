const express = require("express");
const cors = require("cors");
const next = require("next");

const PORT = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    port: "3306",
    password: "Bestappever123",
    database: "boby_db"
  }
};

const knex = require("knex")(options);
const users = require("../api/users");
app.use(cors());
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (res.locals.error = req.app.get("env") === "development" ? err : {})
  });
});

knex
  .raw("SELECT VERSION()")
  .then(version => console.log(version[0][0]))
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/api/test", (req, res) => {
      return res.end("we made it!");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
