import { combineReducers } from 'redux';
import quiz from '../routes/quiz/duck';

const reducers = {
  quiz,
};

export default combineReducers(reducers);
