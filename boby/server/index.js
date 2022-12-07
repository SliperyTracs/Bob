const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3000;


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  client: 'mysql2',
  connection: {
      host: '127.0.0.1',
      user: 'root',
      port: '3306',
      password: 'T0327587b!',
      database: 'boby_db'
  }
}

const knex = require('knex')(options);

knex.raw("SELECT VERSION()").then(
  (version) => console.log((version[0][0]))
).catch((err) => { console.log( err); throw err })
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
