import { createDuck } from 'redux-duck';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

const duck = createDuck('quiz');

export const FETCH_QUIZ =
  duck.defineType('FETCH_QUIZ');
export const FETCH_QUIZ_RESPONSE =
  duck.defineType('FETCH_QUIZ_RESPONSE');
export const SET_ANSWER =
  duck.defineType('SET_ANSWER');

export const fetchQuiz = duck.createAction(FETCH_QUIZ);
export const fetchQuizResponse = duck.createAction(FETCH_QUIZ_RESPONSE);
export const setAnswer = duck.createAction(SET_ANSWER);

export const INITIAL_STATE = Immutable.from({});

const reducer = duck.createReducer({
  [FETCH_QUIZ_RESPONSE]: (state, { payload }) =>
    state.merge({ items: { ...payload }, currentItemIndex: 0 }),
  [SET_ANSWER]: (state, { payload }) =>
    state
      .setIn(['items', state.currentItemIndex, 'answer'], payload ? 'True': 'False')
      .set('currentItemIndex', Math.min(state.currentItemIndex + 1, 9)),
}, INITIAL_STATE);

export const selectQuiz = (state) => state.quiz;

export const selectQuizItems = createSelector(
  selectQuiz,
  quiz => quiz.items
);

export const selectCurrentItemIndex = createSelector(
  selectQuiz,
  quiz => quiz.currentItemIndex
);

export const selectCurrentItem = createSelector(
  selectCurrentItemIndex,
  selectQuizItems,
  (index, items) => items[index]
);

export default reducer;
