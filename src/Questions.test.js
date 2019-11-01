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
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Questions />
      </Provider>
    );

  test('shows error message when api call fails', async () => {
    mockFetchQuestions.mockReturnValue(Promise.reject(Error('broke')));

    const { container, getByText } = renderComponent();
    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton);

    // wait for next tick of the event loop so promises can all resolve
    await wait();
    expect(mockFetchQuestions).toHaveBeenCalledTimes(1);
    expect(getByText('Error Loading Questions')).toBeInTheDocument();
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

    const { container, getByText } = renderComponent();
    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton);

    // wait for next tick of the event loop so promises can all resolve
    await wait();
    expect(mockFetchQuestions).toHaveBeenCalledTimes(1);

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(getByText('1: blah')).toBeInTheDocument();
    expect(getByText('super texty')).toBeInTheDocument();

    expect(getByText('2: yo')).toBeInTheDocument();
    expect(getByText('extra crispy')).toBeInTheDocument();
  });
});
