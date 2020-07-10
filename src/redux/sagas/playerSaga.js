import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPlayer(action){
    try {
//        config = {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true,
//       };
//   const
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.get('/api/user/players');
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'SET_PLAYER', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* addPlayerToTeam(action){
    try{
      const dataForDatabase = {
        team_id: action.payload.team_id,
        player_id: action.payload.player_id
      }

      const response = yield axios.post('/api/user/connectPlayer', dataForDatabase);

    }catch (error) {
      console.log('User get request failed', error);
  }
  }

  function* playerSaga() {
    yield takeLatest('GET_PLAYER', getPlayer);
    yield takeLatest('ADD_PLAYER_TO_TEAM', addPlayerToTeam);
  }
  
  
  export default playerSaga;