const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const server = express();
const PORT = process.env.PORT || 3000;
server.use(bodyParser.json());

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
    server.get("/", (req, res) => {
      return res.end("we made it!");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.get("/user", (req, res) => {
      let query = knex("User").select("User.*");
      query
        .then(users => {
          res.json(users);
        })
        .catch(err => {
          console.error(err);
          return res.json({ success: false, message: "An error occurred, please try again later." });
        });
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Listening on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
