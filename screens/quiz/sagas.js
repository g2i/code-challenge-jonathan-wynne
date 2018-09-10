import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  FETCH_QUIZ,
  fetchQuizResponse
} from './duck';

export default (api) => {
  function* fetchQuizSaga({ payload }) {
    try {
      const { results } = yield call(api.fetchQuiz);
      yield put(fetchQuizResponse(results));
    } catch (err) {
      console.warn('Error: ', err);
    }
  }

  function* watchers() {
    yield fork(function* watcher() {
      yield takeLatest(FETCH_QUIZ, fetchQuizSaga);
    });
  }

  return {
    watchers,
    fetchQuizSaga,
  };
};
