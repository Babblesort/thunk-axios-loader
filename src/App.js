import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionsReducer from './reducers/questions-reducer';
import Questions from './Questions';
import './App.css';

const store = createStore(questionsReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Questions />
    </Provider>
  );
}

export default App;
