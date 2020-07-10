const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/teams', rejectUnauthenticated, (req, res) => {
  console.log("in get route");
  let queryString = 'SELECT * FROM teams JOIN user_teams ON teams.id = user_teams.teams_id';
  
  pool.query(queryString) //[req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/teams', rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const user_id = req.body.id;

  let queryString = 'INSERT INTO teams (name) VALUES ($1) RETURNING id';
  let connectQueryString = 'INSERT INTO user_teams (teams_id, user_id) VALUES ($1, $2)';

  pool.query(queryString, [name])
        .then(results => {
            const team_id = results.rows[0].id;
            pool.query(connectQueryString, [team_id, user_id])
            .then(results => {
              res.send(results.rows);
            
            }).catch(error => {
              console.log(error);
              res.sendStatus(500);
            })
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.delete('/teams/:id', rejectUnauthenticated, (req, res) => {
  let queryTextOne = `DELETE FROM teams_players WHERE teams_id = $1;`
  let queryTextTwo = ` DELETE FROM "user_teams" WHERE "id" = $1;`

  pool.query(queryTextOne, [req.params.id])
      .then(() => { 
        pool.query(queryTextTwo, [req.params.id])
      .then(() => { 
        res.sendStatus(200)
        })
      .catch((err) => {
          console.log('Error completing DELETE team query', err);
          res.sendStatus(500);
      });
        })
      .catch((err) => {
          console.log('Error completing DELETE team query', err);
          res.sendStatus(500);
      });

})

router.put('/teams/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `UPDATE "teams" SET "name" = $1 WHERE "teams"."id" = $2;`
    pool.query(queryText, [ req.body.name, req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE team query', err);
            res.sendStatus(500);
        });

})

router.get('/players', rejectUnauthenticated, (req, res) => {
  console.log("in get route");
  let queryString = 'SELECT * FROM players';
  
  pool.query(queryString)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.get('/stats/:id', rejectUnauthenticated, (req, res) => {
  console.log("in get route");
  let queryString = 'SELECT * FROM stats';
  
  pool.query(queryString, [req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/stats', rejectUnauthenticated, (req, res) => {
  const week = req.body.week;
  const team_id = req.body.team_id;

  let queryString = "SELECT players.name, stats.rushing, stats.touchdowns FROM players FULL JOIN stats ON stats.players_id = players.id FULL JOIN teams_players ON teams_players.players_id = players.id WHERE stats.week = $1 AND teams_players.teams_id = $2";
  

  pool.query(queryString, [week, team_id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/connectPlayer', rejectUnauthenticated, (req, res) => {
  const player_id = req.body.player_id;
  const team_id = req.body.team_id;

  let queryString = 'INSERT INTO teams_players (teams_id, players_id) VALUES ($1, $2)';
  pool.query(queryString, [team_id, player_id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})


//WHERE user_teams.user_id = $1




// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
