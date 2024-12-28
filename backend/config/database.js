const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'react',
  password: '1025',
  port: 5432,
});

module.exports = pool;
