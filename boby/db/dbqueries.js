const knex = require("./knex");
module.exports = {
  getAll(payment_paypal_status) {
    return knex(payment_paypal_status);
  }
};
