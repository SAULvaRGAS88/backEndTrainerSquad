const { Pool } = require('pg');

const pool = new Pool({
  user: 'nysglxqx',
  host: 'isabelle.db.elephantsql.com (isabelle-01)',
  database: 'nysglxqx',
  password: 'Ef4aHDtLE5grcVUhtXLez7yjz7PONYGtW',
  //port: 7248,
});

module.exports = { pool };