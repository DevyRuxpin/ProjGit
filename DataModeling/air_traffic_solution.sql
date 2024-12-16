-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passengers ( 
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    airline VARCHAR(50),
    departure TIMESTAMP,
    arrival TIMESTAMP,
    from_city VARCHAR(50),
    from_country VARCHAR(50),
    to_city VARCHAR(50),    
    to_country VARCHAR(50)
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    passenger_id INTEGER REFERENCES passengers(id),
    flight_id INTEGER REFERENCES flights(id)
);

INSERT INTO passengers (first_name, last_name) VALUES
   ('Thomas', 'More'),
   ('John', 'Locke'),
   ('Jean-Jacques', 'Rousseau'),
   ('Voltaire', 'François-Marie Arouet'),
   ('Denis', 'Diderot'),
   ('David', 'Hume'),
   ('Immanuel', 'Kant'),
   ('Mary', 'Wollstonecraft'),
   ('Adam', 'Smith'),
   ('Jeremy', 'Bentham');

INSERT INTO flights (airline, departure, arrival, from_city, from_country, to_city, to_country) VALUES
   ('United', '2018-01-01 08:00:00', '2018-01-01 10:00:00', 'New York', 'USA', 'Los Angeles', 'USA'),
   ('Delta', '2018-01-01 09:00:00', '2018-01-01 11:00:00', 'Los Angeles', 'USA', 'New York', 'USA'),
   ('American', '2018-01-01 10:00:00', '2018-01-01 12:00:00', 'New York', 'USA', 'Los Angeles', 'USA'),
   ('Southwest', '2018-01-01 11:00:00', '2018-01-01 13:00:00', 'Los Angeles', 'USA', 'New York', 'USA'),
   ('United', '2018-01-01 12:00:00', '2018-01-01 14:00:00', 'New York', 'USA', 'Los Angeles', 'USA'),
   ('Delta', '2018-01-01 13:00:00', '2018-01-01 15:00:00', 'Los Angeles', 'USA', 'New York', 'USA'),
   ('American', '2018-01-01 14:00:00', '2018-01-01 16:00:00', 'New York', 'USA', 'Los Angeles', 'USA'),
   ('Southwest', '2018-01-01 15:00:00', '2018-01-01 17:00:00', 'Los Angeles', 'USA', 'New York', 'USA'),
   ('United', '2018-01-01 16:00:00', '2018-01-01 18:00:00', 'New York', 'USA', 'Los Angeles', 'USA'),
   ('Delta', '2018-01-01 17:00:00', '2018-01-01 19:00:00', 'Los Angeles', 'USA', 'New York', 'USA');

INSERT INTO tickets (passenger_id, flight_id) VALUES
   (1, 1),
   (2, 2),
   (3, 3),
   (4, 4),
   (5, 5),
   (6, 6),
   (7, 7),
   (8, 8),
   (9, 9),
   (10, 10);