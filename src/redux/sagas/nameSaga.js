import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addUserTeam(action){
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.get(`/api/user/players/${action.payload.id}`, config);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'ADD_TEAM_NAME', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* nameSaga() {
    yield takeLatest('ADD_TEAM', addUserTeam);
  }
  
  
  export default nameSaga;