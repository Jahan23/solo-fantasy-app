import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStats() {
    try {
        const response = yield axios.get('/api/user/stats');
        yield put({ type: 'SET_STATS', payload: response.data });
    } catch (error) {
        console.log('List get request failed', error);
    }
}

function* statsSaga() {
    yield takeLatest('FETCH_STATS', fetchStats);
}

export default statsSaga;