
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

CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL
);

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

INSERT INTO "teams" ("name")
VALUES ('Mahomes Alone'), ('Brady Gaga'), ('Baby Got Dak');

INSERT INTO "stats" ("week", "rushing", "touchdowns", "players_id")
VALUES (1, 45, 1, 1), (2, 33, 0, 1), (3, 48, 0, 1), 
(1, 125, 2, 2), (2, 95, 0, 2), (3, 65, 1, 2),
(1, 115, 1, 3), (2, 121, 2, 3), (3, 110, 1, 3);

CREATE TABLE "user_teams" (
	"id" SERIAL PRIMARY KEY,
	"teams_id" INT REFERENCES "teams",
	"user_id" INT REFERENCES "user"
);

INSERT INTO "user_teams" ("teams_id", "user_id")
VALUES (1, 1), (2, 1), (3, 1);

