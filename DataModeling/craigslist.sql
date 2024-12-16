--Create Database
CREATE DATABASE craigslist;

--Create Post Table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    location VARCHAR(200),
    user_id INTEGER REFERENCES users(id),
    region_id INTEGER REFERENCES regions(id),
    category_id INTEGER REFERENCES categories(id)
);

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    encrypted_password VARCHAR(100) UNIQUE,
    prefered_region_id INTEGER REFERENCES regions(id)
);

-- Create Regions Table
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name CHAR(50) UNIQUE
);

-- Create Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name CHAR(50) UNIQUE
);

--POPULATE TABLES

-- Insert data into regions table
INSERT INTO regions (name) VALUES ('North'), ('South'), ('East'), ('West');

-- Insert data into categories table
INSERT INTO categories (name) VALUES ('Electronics'), ('Furniture'), ('Vehicles'), ('Jobs');

-- Insert data into users table
INSERT INTO users (username, encrypted_password, prefered_region_id) VALUES 
('user1', 'password1', 1),
('user2', 'password2', 2),
('user3', 'password3', 3);

-- Insert data into posts table
INSERT INTO posts (title, location, user_id, region_id, category_id) VALUES 
('Selling a laptop', 'New York', 1, 1, 1),
('Looking for a couch', 'Los Angeles', 2, 2, 2),
('Car for sale', 'Chicago', 3, 3, 3);