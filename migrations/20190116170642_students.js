
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      tbl.increments();
      tbl.text('name', 127)
      tbl.timestamp(true, true)
      tbl.unique('name', 'uq_students_name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
