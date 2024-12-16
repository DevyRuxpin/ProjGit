--Creating Soccer League Database

CREATE DATABASE soccer_league;

--Creating Teams Table
CREATE TABLE teams (
    id  SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
);

--Creating Players Table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    height FLOAT NOT NULL,
    current_team-id INTEGER REFERENCES teams(id)
);

--Creating Referees Table
CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

--Creating Matches Table
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams(id),
    away_team_id INTEGER REFERENCES teams(id),
    location VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    season_id INTEGER REFERENCES season(id),
    head_referee_id INTEGER REFERENCES referees(id),
);

--Creating Season Table
CREATE TABLE season (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

--Creating Lineups Table
CREATE TABLE lineups (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id),
    team_id INTEGER REFERENCES teams(id),
);

--Creating Goals Table
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id)
);

--Creating Results Table
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id),
    match_id INTEGER REFERENCES matches(id),
    results ENUM('win', 'loss', 'draw')
);



--Inserting Data into Tables

-- Inserting data into teams table
INSERT INTO teams (team_name, city) VALUES
('Team A', 'City A'),
('Team B', 'City B'),
('Team C', 'City C');

-- Inserting data into players table
INSERT INTO players (player_name, birth_date, height, current_team_id) VALUES
('Player 1', '1990-01-01', 180.5, 1),
('Player 2', '1992-02-02', 175.3, 2),
('Player 3', '1994-03-03', 182.7, 3);

-- Inserting data into season table
INSERT INTO season (start_date, end_date) VALUES
('2023-01-01', '2023-12-31');

-- Inserting data into matches table
INSERT INTO matches (home_team_id, away_team_id, location, date, start_time, season_id, head_referee_id) VALUES
(1, 2, 'Stadium A', '2023-05-01', '15:00:00', 1, 1),
(2, 3, 'Stadium B', '2023-06-01', '17:00:00', 1, 2);

-- Inserting data into lineups table
INSERT INTO lineups (player_id, match_id, team_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3);

-- Inserting data into goals table
INSERT INTO goals (player_id, match_id) VALUES
(1, 1),
(2, 1),
(3, 2);

-- Inserting data into results table
INSERT INTO results (team_id, match_id, results) VALUES
(1, 1, 'Win'),
(2, 1, 'Loss'),
(3, 2, 'Draw');