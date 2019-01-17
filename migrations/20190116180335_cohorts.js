
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', tbl => {
        
        tbl.increments()
        tbl.text('name', 127)
        tbl.timestamp(true, true)
        tbl.unique('name', 'uq_cohort_name')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
