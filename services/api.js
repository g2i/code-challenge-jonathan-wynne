const createApi = () => {
  const fetchQuiz = () =>
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
        .then(response => response.json());

  return {
    fetchQuiz
  };
};

export default createApi;
