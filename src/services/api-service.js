const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fakeQuestions = [
  'What is love?',
  'What is your favorite color?',
  'How many roads must one walk?'
];

export const fetchQuestions = callCount => {
  if (callCount % 2 === 0) {
    return delay(2000).then(() => fakeQuestions);
  }
  return delay(2000).then(() => {
    throw Error('broken');
  });
};
