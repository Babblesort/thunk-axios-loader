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
        <p className="questions-list">
          {questions.map(q => (
            <ul>
              <li>{q.questionNumber}</li>
              <li>{q.questionTopic}</li>
              <li>{q.questionText}</li>
            </ul>
          ))}
        </p>
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
