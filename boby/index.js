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

knex.raw("SELECT VERSION()").then(version => console.log(version[0][0]));
app
  .prepare()
  .then(() => {
    server.get("/", (req, res) => {
      return res.end("we made it!");
    });

    // server.get("*", (req, res) => {
    //   return handle(req, res);
    // });

    server.get("/users", (req, res) => {
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

    server.post("/user", (req, res) => {
      const name = req.body.name ? req.body.name : "";
      const email = req.body.email ? req.body.email : "";

      if (!name) {
        return res.json({ success: false, message: "Name is required" });
      }

      knex("user")
        .insert({ name, email })
        .then(id => {
          //get user by id
          knex("user")
            .select({
              id: "id",
              name: "name"
            })
            .where({ id })
            .then(user => {
              return res.json(user[0]);
            });
        })
        .catch(err => {
          console.error(err);
          return res.json({ success: false, message: "An error occurred, please try again later." });
        });
    });

    server.put("/:id", async (req, res) => {
      //get user first
      const { id } = req.params;
      const changes = req.body;

      try {
        const count = await knex("user").where({ id }).update(changes); //returns count of how many records are changed
        if (count) {
          res.status(200).json({ updated: count });
        } else {
          res.status(404).json({ message: "Record not found" });
        }
      } catch (err) {
        res.status(500).json({ message: "Error updating new post", error: err });
      }
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
