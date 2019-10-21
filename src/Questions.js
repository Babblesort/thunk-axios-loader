import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadQuestionsThunk } from './actions/questions-actions';

const Questions = ({
  questions,
  loadQuestions,
  isLoadingQuestions,
  hasLoadingQuestionsError
}) => {
  const [apiCallCount, setApiCallCount] = useState(0);
  const handleClick = () => {
    setApiCallCount(apiCallCount + 1);
    loadQuestions(apiCallCount);
  };
  return (
    <div className="questions">
      <button onClick={handleClick}>Load Questions</button>

      {isLoadingQuestions && <p className="loading-message">Loading...</p>}

      {hasLoadingQuestionsError && (
        <p className="error-message">Error Loading Questions</p>
      )}

      {questions.length > 0 && (
        <ol className="questions-list">
          {questions.map(q => (
            <li>{q}</li>
          ))}
        </ol>
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
