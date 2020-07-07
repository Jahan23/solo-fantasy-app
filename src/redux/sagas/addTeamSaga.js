import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addTeam(action){
    try {
      const config = {
        name: action.payload.name, id: action.payload.id
      };
  
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      yield axios.post(`/api/user/teams`, config);
      const getTeamsResponse = yield axios.get(`/api/user/teams/${action.payload.id}`);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'SET_TEAMS', payload: getTeamsResponse.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* nameSaga() {
    yield takeLatest('ADD_TEAM', addTeam);
  }
  
  
  export default nameSaga;