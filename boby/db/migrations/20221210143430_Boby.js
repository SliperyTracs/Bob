/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return [
    knex.schema
      .createTableIfNotExists("Program", function (table) {
        // integer id
        table.increments("id");
        // name
        table.string("name");
        //description
        table.string("description");
        //User_id
        table.string("user");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("Program").insert([{ name: "PowerLifing", description: "very good soup", user: "1" }]);
      }),
    knex.schema
      .createTableIfNotExists("Excercise", function (table) {
        // integer id
        table.increments();
        // name
        table.string("name");
        //description
        table.string("description");
        //Prog_id
        table.string("program");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("Excercise").insert([{ name: "Db Bulgarian split squats", description: "very pain sia", program: "1" }]);
      }),
    knex.schema
      .createTableIfNotExists("Set", function (table) {
        // integer id
        table.increments();
        // Reps
        table.integer("reps");
        //Weight
        table.integer("weight");
        //RPE
        table.integer("rpe");
        //Comments
        table.string("comments");
        //Excercise id
        table.string("excercise");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("Set").insert([{ reps: 100, weight: 100, rpe: 0, comments: "wah damn easy sia", excercise: "1" }]);
      }),
    knex.schema
      .createTableIfNotExists("Entry", function (table) {
        // integer id
        table.increments();
        // name
        table.string("program");
        //description
        table.string("excercise");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("Entry").insert([{ program: "1", excercise: "1" }]);
      }),
    knex.schema
      .createTableIfNotExists("User", function (table) {
        // integer id
        table.increments();
        // name
        table.string("name");
        //Username
        table.string("username");
        //Password
        table.string("password");
        //Email
        table.string("email");
        //Mobile NO
        table.string("mobileNo");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("User").insert([{ name: "Shermaine sng", username: "sherms", password: "Password", email: "Sherms@gmail.com", mobileNo: "82340328" }]);
      })
  ];
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTableIfExists("Program"), knex.schema.dropTableIfExists("Excercise"), knex.schema.dropTableIfExists("Set"), knex.schema.dropTableIfExists("Entry"), knex.schema.dropTableIfExists("User")]);
};
