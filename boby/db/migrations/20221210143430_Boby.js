/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return [
    knex.schema
      .createTable("User", function (table) {
        // integer id
        table.increments("id").primary();
        // name
        table.string("name");
        //Username
        table.string("username");
        //Password~
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
      }),
    knex.schema
      .createTable("Program", function (table) {
        // integer id
        table.increments("id").primary();
        // name
        table.string("name");
        //description
        table.string("description");
        //DateCreated
        table.timestamps();

        table.integer("user_id").unsigned().references("id").inTable("User");
      })
      .then(function () {
        return knex("Program").insert([{ name: "PowerLifing", description: "very good soup", user_id: "1" }]);
      }),
    knex.schema
      .createTable("Exercise", function (table) {
        // integer id
        table.increments("id").primary();
        // name
        table.string("name");
        //description
        table.string("description");
        //DateCreated
        table.timestamps();
      })
      .then(function () {
        return knex("Exercise").insert([{ name: "Db Bulgarian split squats", description: "very pain sia" }]);
      }),
    knex.schema
      .createTable("Entry", function (table) {
        // integer id
        table.increments("id").primary();
        //DateCreated
        table.timestamps();
        table.integer("program_id").unsigned().references("id").inTable("Program");
        table.integer("exercise_id").unsigned().references("id").inTable("Exercise");
      })
      .then(function () {
        return knex("Entry").insert([{ program_id: "1", exercise_id: "1" }]);
      }),
    knex.schema
      .createTable("Set", function (table) {
        // integer id
        table.increments("id").primary();
        // Reps
        table.integer("reps");
        //Weight
        table.integer("weight");
        //RPE
        table.integer("rpe");
        //Comments
        table.string("comments");
        //DateCreated
        table.timestamps();
        table.integer("exercise_id").unsigned().references("id").inTable("Exercise");
      })
      .then(function () {
        return knex("Set").insert([{ reps: 100, weight: 100, rpe: 0, comments: "wah damn easy sia", exercise_id: "1" }]);
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
