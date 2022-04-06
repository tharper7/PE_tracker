const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async(req, res) => {
    try {
      const client = await pool.connect();

      client.release();
      res.send("Works");
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})
.get('/db-info', async(req, res) => {
  try {
    const client = await pool.connect();

    const tables = await client.query(
"
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email text NOT NULL,
  password text NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  schol INT NOT NULL,
  expires DATE NOT NULL
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE observations (
  id SERIAL PRIMARY KEY,
  users_id INT NOT NULL,
  students_id INT NOT NULL,
  tasks_id INT NOT NULL,
  duration INTERVAL NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);      
      
SELECT c.relname AS table, a.attname AS column, t.typname AS type FROM pg_catalog.pg_class AS c LEFT JOIN pg_catalog.pg_attribute AS a ON c.oid = a.attrelid AND a.attnum > 0 LEFT JOIN pg_catalog.pg_type AS t ON a.atttypid = t.oid WHERE c.relname IN ('users', 'observations', 'students', 'schools', 'tasks') ORDER  BY c.relname, a.attnum;"
);
    
    const locals = {
      'tables': (tables) ? tables.rows : null
    };
    
    res.render('pages/db-info', locals);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
})
.listen(PORT, () => console.log('Listening on ${ PORT }'));
