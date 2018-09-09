import { createDuck } from 'redux-duck';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

const duck = createDuck('quiz');

export const FETCH_QUIZ =
  duck.defineType('FETCH_QUIZ');
export const FETCH_QUIZ_RESPONSE =
  duck.defineType('FETCH_QUIZ_RESPONSE');

export const fetchQuiz = duck.createAction(FETCH_QUIZ);
export const fetchQuizResponse = duck.createAction(FETCH_QUIZ_RESPONSE);

export const INITIAL_STATE = Immutable.from({});

const reducer = duck.createReducer({
  [FETCH_QUIZ_RESPONSE]: (state, { payload }) =>
    state.merge({ ...payload }),
}, INITIAL_STATE);

export const selectQuiz = (state) => state.quiz;

export default reducer;
