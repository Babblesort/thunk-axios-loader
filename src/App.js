import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionsReducer from './reducers/questions-reducer';
import Questions from './Questions';
import { AuthContext } from './auth-context';
import './App.css';

const store = createStore(questionsReducer, applyMiddleware(thunk));

function App() {
  const user = {
    name: 'Helena Bonham Carter',
    id: 'hcarter@movies.com',
    initials: 'HBC',
    isLoggedIn: true
  };

  const [authUser, setUser] = useState(user);

  const toggleLogin = () => {
    setUser({ ...authUser, isLoggedIn: !authUser.isLoggedIn });
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ authUser, toggleLogin }}>
        <Questions />
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
