
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "players" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL
);

ALTER TABLE "players"


CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL


);

ALTER TABLE teams
ADD FOREIGN KEY (id)
REFERENCES user_teams(teams_id)
ON DELETE CASCADE;

ALTER TABLE teams  ADD  CONSTRAINT FK_teams_user_teams FOREIGN KEY user_teams.teams_id
REFERENCES user_teams.teams_id
ON DELETE CASCADE
GO

DROP TABLE "teams";

CREATE TABLE "teams_players" (
	"id" SERIAL PRIMARY KEY,
	"teams_id" INT REFERENCES "teams",
	"players_id" INT REFERENCES "players"
);

CREATE TABLE "stats" (
	"id" SERIAL PRIMARY KEY,
	"week" INT NOT NULL,
	"rushing" INT NOT NULL,
	"touchdowns" INT NOT NULL,
	"players_id" INT REFERENCES "players"
);

INSERT INTO "players" ("name")
VALUES ('Mark Ingram'), ('Derrick Henry'), ('Ezekial Elliott');

INSERT INTO "players" ("name")
VALUES ('Adrian Peterson'), ('Leveon Bell'), ('Christian McCaffrey'), ('Saquon Barkley'), 
('Nick Chubb'), ('Dalvin Cook'), ('Alvin Kamara'), ('Aaron Jones'), ('Josh Jacobs');

INSERT INTO "teams" ("name")
VALUES ('Mahomes Alone'), ('Brady Gaga'), ('Baby Got Dak');

INSERT INTO "stats" ("week", "rushing", "touchdowns", "players_id")
VALUES (1, 45, 1, 1), (2, 33, 0, 1), (3, 48, 0, 1), 
(1, 125, 2, 2), (2, 95, 0, 2), (3, 65, 1, 2),
(1, 115, 1, 3), (2, 121, 2, 3), (3, 110, 1, 3);

CREATE TABLE "user_teams" (
	"id" SERIAL PRIMARY KEY,
	"teams_id" INT REFERENCES "teams"
	ON DELETE CASCADE,

	"user_id" INT REFERENCES "user"
);

CREATE TABLE user_teams(
   "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "teams_id" INT REFERENCES "teams",
    CONSTRAINT FK_user_teams_teams_id FOREIGN KEY (id) REFERENCES teams(id) ON DELETE CASCADE
);

DROP TABLE "user_teams";
INSERT INTO "user_teams" ("teams_id", "user_id")
VALUES (1, 1), (2, 1), (3, 1);

SELECT "name"
FROM "teams"
JOIN "user_teams"
ON "teams"."id" = "user_teams"."teams_id" WHERE "user_teams"."user_id" = 1;

SELECT name FROM players JOIN user_teams ON players.id = user_teams.players_id WHERE user_teams.user_id = 1;

SELECT players.name, stats.rushing, stats.touchdowns FROM stats JOIN players ON stats.players_id = 
players.id WHERE stats.week = 1;


-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- CREATE TABLE "players" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"name" VARCHAR (80) NOT NULL
-- );

-- CREATE TABLE "teams" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"name" VARCHAR (80) NOT NULL
-- );

-- CREATE TABLE "teams_players" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"teams_id" INT REFERENCES "teams",
-- 	"players_id" INT REFERENCES "players"
-- );

-- CREATE TABLE "stats" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"week" INT NOT NULL,
-- 	"rushing" INT NOT NULL,
-- 	"touchdowns" INT NOT NULL,
-- 	"players_id" INT REFERENCES "players"
-- );

-- INSERT INTO "players" ("name")
-- VALUES ('Mark Ingram'), ('Derrick Henry'), ('Ezekial Elliott');

-- INSERT INTO "teams" ("name")
-- VALUES ('Mahomes Alone'), ('Brady Gaga'), ('Baby Got Dak');

-- INSERT INTO "stats" ("week", "rushing", "touchdowns", "players_id")
-- VALUES (1, 45, 1, 1), (2, 33, 0, 1), (3, 48, 0, 1), 
-- (1, 125, 2, 2), (2, 95, 0, 2), (3, 65, 1, 2),
-- (1, 115, 1, 3), (2, 121, 2, 3), (3, 110, 1, 3);

-- CREATE TABLE "user_teams" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"teams_id" INT REFERENCES "teams",
-- 	"user_id" INT REFERENCES "user"
-- );

-- INSERT INTO "user_teams" ("teams_id", "user_id")
-- VALUES (1, 1), (2, 1), (3, 1);

