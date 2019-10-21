import {
  BEGIN_LOADING_QUESTIONS,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR
} from '../actions/questions-actions';

export const initialState = () => ({
  questions: [],
  isLoadingQuestions: false,
  hasLoadingQuestionsError: false
});

export default (state = initialState(), action = { type: undefined }) => {
  switch (action.type) {
    case BEGIN_LOADING_QUESTIONS: {
      return {
        ...state,
        questions: [],
        isLoadingQuestions: true,
        hasLoadingQuestionsError: false
      };
    }

    case LOAD_QUESTIONS_SUCCESS: {
      return {
        ...state,
        questions: [...action.questions],
        isLoadingQuestions: false,
        hasLoadingQuestionsError: false
      };
    }

    case LOAD_QUESTIONS_ERROR: {
      return {
        ...state,
        isLoadingQuestions: false,
        hasLoadingQuestionsError: true
      };
    }
    default:
      return state;
  }
};
