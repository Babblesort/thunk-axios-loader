import React from 'react';
import { AuthContext } from './auth-context';

const UserDisplay = () => (
  <AuthContext.Consumer>
    {({ authUser, toggleLogin }) => (
      <div className="user-info">
        <div className="circle">{authUser.initials}</div>

        <div className="user-names">
          <div>{authUser.id}</div>
          <div>{authUser.name}</div>
        </div>

        <button
          className={`login-button ${
            authUser.isLoggedIn ? 'logged-in' : 'logged-out'
          }`}
          onClick={toggleLogin}
        >
          {authUser.isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
        <div></div>
      </div>
    )}
  </AuthContext.Consumer>
);

export default UserDisplay;
