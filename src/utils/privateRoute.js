import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem('authToken');
  const isloggedin = localStorage.getItem('isloggedin');
  const user = localStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={(props) =>
        isloggedin && authToken && user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
