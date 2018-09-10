import quizSagas from '../screens/quiz/sagas';

export default (api) => function* rootSaga() {
  yield* quizSagas(api).watchers();
};
