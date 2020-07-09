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

router.get('/teams', (req, res) => {
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

router.post('/teams', (req, res) => {
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

router.delete('/teams/:id', (req, res) => {
  let queryText = `DELETE 
  FROM "user_teams" 
  WHERE "id" = $1`
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE team query', err);
            res.sendStatus(500);
        });

})

router.get('/players', (req, res) => {
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

router.get('/stats/:id', (req, res) => {
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

router.post('/stats', (req, res) => {
  const week = req.body.week;

  let queryString = 'SELECT players.name, stats.rushing, stats.touchdowns FROM stats JOIN players ON stats.players_id = players.id WHERE stats.week = $1;';
  

  pool.query(queryString, [week])
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
