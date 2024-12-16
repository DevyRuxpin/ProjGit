DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

-- Create artists table
CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create albums table
CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  producer TEXT NOT NULL,
  release_date DATE NOT NULL,
  duration_in_seconds INTEGER NOT NULL
);

-- Create songs table
CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  album_id INTEGER REFERENCES albums(id)
);

-- Create song_artists junction table
CREATE TABLE song_artists
(
  song_id INTEGER REFERENCES songs(id),
  artist_id INTEGER REFERENCES artists(id),
  PRIMARY KEY (song_id, artist_id)
);

-- Insert data into artists table
INSERT INTO artists (name) VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Carey'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny''s Child');

-- Insert data into albums table
INSERT INTO albums (title, producer, release_date, duration_in_seconds) VALUES
  ('Middle of Nowhere', 'Dust Brothers, Stephen Lironi', '1997-04-15', 238),
  ('A Night at the Opera', 'Roy Thomas Baker', '1975-10-31', 355),
  ('Daydream', 'Walter Afanasieff', '1995-11-14', 282),
  ('A Star Is Born', 'Benjamin Rice', '2018-09-27', 216),
  ('Silver Side Up', 'Rick Parashar', '2001-08-21', 223),
  ('The Blueprint 3', 'Al Shux', '2009-10-20', 276),
  ('Prism', 'Max Martin, Cirkut', '2013-12-17', 215),
  ('Hands All Over', 'Shellback, Benny Blanco', '2011-06-21', 201),
  ('Let Go', 'The Matrix', '2002-05-14', 244),
  ('The Writing''s on the Wall', 'Darkchild', '1999-11-07', 240);

-- Insert data into songs table
INSERT INTO songs (title, album_id) VALUES
  ('MMMBop', 1),
  ('Bohemian Rhapsody', 2),
  ('One Sweet Day', 3),
  ('Shallow', 4),
  ('How You Remind Me', 5),
  ('New York State of Mind', 6),
  ('Dark Horse', 7),
  ('Moves Like Jagger', 8),
  ('Complicated', 9),
  ('Say My Name', 10);

-- Insert data into song_artists table
INSERT INTO song_artists (song_id, artist_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (3, 4),
  (4, 5),
  (4, 6),
  (5, 7),
  (6, 8),
  (6, 9),
  (7, 10),
  (7, 11),
  (8, 12),
  (8, 13),
  (9, 14),
  (10, 15);