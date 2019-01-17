
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'one'},
        {id: 2, name: 'two'},
        {id: 3, name: 'three'}
      ]);
    });
};
