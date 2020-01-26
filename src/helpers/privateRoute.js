import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isloggedin = localStorage.getItem('isloggedin');
  const user = localStorage.getItem('user');
  console.log('Private', token, isloggedin, user);
  return (
    <Route
      {...rest}
      render={props =>
        isloggedin && token && user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
