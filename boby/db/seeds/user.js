/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("User")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        { id: 1, name: "Hettie Marshall", username: "Hettie", password: "lala", email: "lantunde@acbo.va", mobileNo: "7889" },
        { id: 2, name: "Hester Owens", email: "zo@girih.lv" },
        { id: 3, name: "Henry Jackson", email: "bekamohi@owo.mt" }
      ]);
    });
};
