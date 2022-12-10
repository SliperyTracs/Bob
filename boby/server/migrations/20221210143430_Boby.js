/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return ([
        knex.schema.createTableIfNotExists("Program", function (table) {
            // integer id
            table.increments(); 
            // name
            table.string('Name');
            //description
            table.string('Description');
            //User_id
            table.string('User');
            //DateCreated
            table.date('DateCreated');
        }).then(function () {
                return knex("Program").insert([
                    {Name: "PowerLifing", Description: "very good soup", User: '1', DateCreated: '13/12/2022'},
                ]);
            }
        ),
        knex.schema.createTableIfNotExists("Excercise", function (table) {
            // integer id
            table.increments(); 
            // name
            table.string('Name');
            //description
            table.string('Description');
            //Prog_id
            table.string('Program');
            //DateCreated
            table.date('DateCreated');
        }).then(function () {
                return knex("Excercise").insert([
                    {Name: "Db Bulgarian split squats", Description: "very pain sia", Program: '1', DateCreated: '13/12/2022'},
                ]);
            }
        ),
        knex.schema.createTableIfNotExists("Set", function (table) {
            // integer id
            table.increments(); 
            // Reps
            table.integer('Reps');
            //Weight
            table.integer('Weight');
            //RPE
            table.integer('RPE');
            //Comments
            table.string('Comments');
            //Excercise id
            table.string('Excercise');
            //DateCreated
            table.date('DateCreated');
        }).then(function () {
                return knex("Set").insert([
                    {Reps: 100, Weight: 100, RPE: 0,Comments : "wah damn easy sia", Excercise : "1", DateCreated: 13/12/2022},
                ]);
            }
        ),
        knex.schema.createTableIfNotExists("Entry", function (table) {
            // integer id
            table.increments(); 
            // name
            table.string('Program');
            //description
            table.string('Excercise');
            //DateCreated
            table.date('DateCreated');
        }).then(function () {
                return knex("Entry").insert([
                    {Program: '1', Excercise : '1',DateCreated: '13/12/2022'},
                ]);
            }
        ),
        knex.schema.createTableIfNotExists("User", function (table) {
            // integer id
            table.increments(); 
            // name
            table.string('Name');
            //Username
            table.string('Username')
            //Password
            table.string('Password');
            //Email
            table.string('Email');
            //Mobile NO
            table.string('MobileNo')
            //DateCreated
            table.date('DateCreated');
        }).then(function () {
                return knex("User").insert([
                    {Name: "Shermaine sng",Username: "sherms",Password:"Password",Email:"Sherms@gmail.com",MobileNo:"82340328", DateCreated: '13/12/2022'},
                ]);
            }
        ),
        
        
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("Program"),
        knex.schema.dropTableIfExists("Excercise"),
        knex.schema.dropTableIfExists("Set"),
        knex.schema.dropTableIfExists("Entry"),
        knex.schema.dropTableIfExists("User"),
    ]);
};
