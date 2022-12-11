const express = require("express");
const router = express.Router();
const queries = require("../server/queries");

router.get("/", (req, res) => {
  queries.getAll("payment_paypal_status").then(users => {
    res.json(users);
  });
});
module.exports = router;
