import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addStats(action){
    try {
      const config = {
        week: action.payload.week,
        team_id: action.payload.team_id
      };
  
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.post(`/api/user/stats`, config);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'SET_STATS', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* playerStatsSaga() {
    yield takeLatest('ADD_STATS', addStats);
  }
  
  
  export default playerStatsSaga;