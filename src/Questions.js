import React from 'react';
import { connect } from 'react-redux';
import { loadQuestionsThunk } from './actions/questions-actions';

const Questions = ({
  questions,
  loadQuestions,
  isLoadingQuestions,
  hasLoadingQuestionsError
}) => {
  return (
    <div className="questions">
      <button onClick={loadQuestions}>Load Questions</button>

      {isLoadingQuestions && <p className="loading-message">Loading...</p>}

      {hasLoadingQuestionsError && (
        <p className="error-message">Error Loading Questions</p>
      )}

      {questions.length > 0 && (
        <div className="questions-list">
          <ul>
            {questions.map(q => (
              <li key={q.questionNumber}>
                <p>
                  {q.questionNumber}: {q.questionTopic}
                </p>
                <span>{q.questionText}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  questions: state.questions,
  isLoadingQuestions: state.isLoadingQuestions,
  hasLoadingQuestionsError: state.hasLoadingQuestionsError
});

const mapDispatchToProps = {
  loadQuestions: loadQuestionsThunk
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
