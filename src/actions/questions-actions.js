import { fetchQuestions } from '../services/api-service';

export const BEGIN_LOADING_QUESTIONS = 'BEGIN_LOADING_QUESTIONS';
export const beginLoadingQuestions = () => ({
  type: BEGIN_LOADING_QUESTIONS
});

export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const loadQuestionsSuccess = questions => {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    questions
  };
};

export const LOAD_QUESTIONS_ERROR = 'LOAD_QUESTIONS_ERROR';
export const loadQuestionsError = message => ({
  type: LOAD_QUESTIONS_ERROR,
  message
});

export const loadQuestionsThunk = () => async dispatch => {
  try {
    dispatch(beginLoadingQuestions());
    const questionsResponse = await fetchQuestions();
    dispatch(loadQuestionsSuccess(questionsResponse.data));
  } catch (error) {
    dispatch(loadQuestionsError());
  }
};

// export const loadQuestionsThunkPromiseBased = () => dispatch => {
//   dispatch(beginLoadingQuestions());
//   fetchQuestions()
//     .then(questionsResponse =>
//       dispatch(loadQuestionsSuccess(questionsResponse.data))
//     )
//     .catch(() => dispatch(loadQuestionsError()));
// };
