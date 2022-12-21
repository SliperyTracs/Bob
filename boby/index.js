const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const server = express();
const router =express.Router();
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
    password: "T0327587b!",
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
    server.delete("/api/delete/:model", (req,res) => {
      let model = req.params.model
      knex(model).del()
      .then(res.json({success: true, message : "Deleted items successfully"}))
      .catch(err => {
        console.error(err);
        return res.json({ success: false, message: "An error occurred, please try again later." });
      });
    })
    server.get("/api/:model", (req, res) => {
      let model = req.params.model
      let query = knex(model).select(`${model}.*`);
      query
        .then(items => {
          res.json(items);
        })
        .catch(err => {
          console.error(err);
          return res.json({ success: false, message: "An error occurred, please try again later." });
        });
    });

    server.post("/api/:model", (req, res) => {
      const body = req.body
      let model = req.params.model
      if (!body) {
        return res.json({ success: false, message: "Body is required" });
      }

      knex(model)
        .insert(body)
        .then(id => {
          //get user by id
          knex(model)
            .where({ id })
            .then(items => {
              return res.json(items);
            });
        })
        .catch(err => {
          console.error(err);
          return res.json({ success: false, message: "An error occurred, please try again later." });
        });
    });
    server.get('/api/:model/:id', (req, res) => {
      let id = parseInt(req.params.id)
      let model = req.params.model
      let query = knex(model).where('id',id)
      query
        .then(item => {
          res.json(item);
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
