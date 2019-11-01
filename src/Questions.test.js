import Questions from './Questions';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionsReducer from './reducers/questions-reducer';
import * as apiService from './services/api-service';

describe('Questions component backed by redux with mock api calls', () => {
  let store;
  let mockFetchQuestions;

  beforeEach(() => {
    store = createStore(questionsReducer, applyMiddleware(thunk));
    mockFetchQuestions = jest.spyOn(apiService, 'fetchQuestions');
  });

  afterEach(() => {
    mockFetchQuestions.mockRestore();
  });

  test('shows error message when api call fails', async () => {
    mockFetchQuestions.mockReturnValue(Promise.reject(Error('broke')));

    const { container, getByText } = render(
      <Provider store={store}>
        <Questions />
      </Provider>
    );

    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton);

    expect(mockFetchQuestions).toHaveBeenCalledTimes(1);

    // wait for next tick of the event loop so promises can all resolve
    await wait();

    expect(getByText('Error Loading Questions')).toBeDefined();
  });

  test('shows questions when api call succeeds', async () => {
    mockFetchQuestions.mockReturnValue(
      Promise.resolve({
        data: [
          {
            questionNumber: 1,
            questionTopic: 'blah',
            questionText: 'super texty'
          },
          {
            questionNumber: 2,
            questionTopic: 'yo',
            questionText: 'extra crispy'
          }
        ]
      })
    );

    const { container, getByText } = render(
      <Provider store={store}>
        <Questions />
      </Provider>
    );
    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton);

    expect(mockFetchQuestions).toHaveBeenCalledTimes(1);

    // wait for next tick of the event loop so promises can all resolve
    await wait();

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(getByText('1: blah')).toBeInTheDocument();
    expect(getByText('super texty')).toBeInTheDocument();

    expect(getByText('2: yo')).toBeInTheDocument();
    expect(getByText('extra crispy')).toBeInTheDocument();
  });
});
