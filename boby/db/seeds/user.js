/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user").then(function () {
    // Inserts seed entries
    return knex("user").insert([
      { name: "Hettie Marshall", email: "lantunde@acbo.va" },
      { name: "Hester Owens", email: "zo@girih.lv" },
      { name: "Henry Jackson", email: "bekamohi@owo.mt" }
    ]);
  });
};
