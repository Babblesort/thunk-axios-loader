import axios from 'axios';

const getSurveyQuestionsEndpoint =
  'https://us-central1-delivery-principles-survey.cloudfunctions.net/getSurveyQuestions';

export const fetchQuestions = () => axios.get(getSurveyQuestionsEndpoint);
