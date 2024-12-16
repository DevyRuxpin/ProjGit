-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  moons TEXT[],
  galaxy_id INTEGER REFERENCES galaxies(id)
);

CREATE TABLE orbits
(
  id SERIAL PRIMARY KEY,
  orbits_around INTEGER REFERENCES planets(id),
  orbital_period_in_years FLOAT NOT NULL
);

INSERT INTO galaxies
  (name)
VALUES
  ('Milky Way'),
  ('Andromeda'),
  ('Triangulum');

INSERT INTO planets
  (name, moons, galaxy_id)
VALUES
  ('Earth', '{"The Moon"}', (SELECT id FROM galaxies WHERE name = 'Milky Way')),
  ('Mars', '{"Phobos", "Deimos"}', (SELECT id FROM galaxies WHERE name = 'Milky Way')),
  ('Venus', '{}', (SELECT id FROM galaxies WHERE name = 'Milky Way')),
  ('Neptune', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}', (SELECT id FROM galaxies WHERE name = 'Milky Way')),
  ('Proxima Centauri b', '{}', (SELECT id FROM galaxies WHERE name = 'Milky Way')),
  ('Gliese 876 b', '{}', (SELECT id FROM galaxies WHERE name = 'Milky Way'));

INSERT INTO orbits
  (orbits_around, orbital_period_in_years)
VALUES
  ((SELECT id FROM planets WHERE name = 'Earth'), 1.00),
  ((SELECT id FROM planets WHERE name = 'Mars'), 1.88),
  ((SELECT id FROM planets WHERE name = 'Venus'), 0.62),
  ((SELECT id FROM planets WHERE name = 'Neptune'), 164.8),
  ((SELECT id FROM planets WHERE name = 'Proxima Centauri b'), 0.03),
  ((SELECT id FROM planets WHERE name = 'Gliese 876 b'), 0.23);