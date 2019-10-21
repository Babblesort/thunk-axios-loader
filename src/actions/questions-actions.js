import { fetchQuestions } from '../services/api-service';

export const BEGIN_LOADING_QUESTIONS = 'BEGIN_LOADING_QUESTIONS';
export const beginLoadingQuestions = () => ({
  type: BEGIN_LOADING_QUESTIONS
});

export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const loadQuestionsSuccess = questions => ({
  type: LOAD_QUESTIONS_SUCCESS,
  questions
});

export const LOAD_QUESTIONS_ERROR = 'LOAD_QUESTIONS_ERROR';
export const loadQuestionsError = () => ({
  type: LOAD_QUESTIONS_ERROR
});

export const loadQuestionsThunk = callCount => async dispatch => {
  try {
    dispatch(beginLoadingQuestions());
    const questions = await fetchQuestions(callCount);
    dispatch(loadQuestionsSuccess(questions));
  } catch (error) {
    dispatch(loadQuestionsError());
  }
};
