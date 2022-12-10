exports.up = function (knex, Promise) {
    return ([
        knex.schema.createTableIfNotExists("payment_paypal_status", function (table) {
            // integer id
            table.increments(); 
            // name
            table.string('name');
            //description
            table.string('description');
        }).then(function () {
                return knex("payment_paypal_status").insert([
                    {name: "A", description: "A"},
                    {name: "B", description: "BB"},
                    {name: "C", description: "CCC"},
                    {name: "D", description: "DDDD"}
                ]);
            }
        ),
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("payment_paypal_status")
    ]);
};
