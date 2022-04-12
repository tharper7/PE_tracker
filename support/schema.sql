CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email text NOT NULL,
  password text NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  school INT NOT NULL,
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

INSERT INTO tasks (name) VALUES
  ('Planned Pres.'),
  ('Response Pres.'),
  ('Monitoring'),
  ('Perform. Feedbk.'),
  ('Motiv. Feedbk.'),
  ('Beg/End Class'),
  ('Equip. Mgt.'),
  ('Organization'),
  ('Behavior Mgt.'),
  ('Other Tasks');