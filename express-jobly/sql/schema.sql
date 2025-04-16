DROP DATABASE IF EXISTS jobly;

CREATE DATABASE jobly;

\c jobly

CREATE TABLE companies (
    handle TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    num_employees INTEGER,
    description TEXT,
    logo_url TEXT
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    salary INTEGER CHECK (salary >= 0),
    equity NUMERIC CHECK (equity >= 0 AND equity <= 1),
    company_handle TEXT NOT NULL REFERENCES companies ON DELETE CASCADE
);

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE applications (
    username TEXT REFERENCES users ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs ON DELETE CASCADE,
    PRIMARY KEY (username, job_id)
); 