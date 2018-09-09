import quizSagas from '../routes/quiz/sagas';

export default (api) => function* rootSaga() {
  yield* quizSagas(api).watchers();
};
