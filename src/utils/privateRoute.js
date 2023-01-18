import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  const authToken = localStorage.getItem('authToken');
  const isloggedin = localStorage.getItem('isloggedin');
  const user = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      element={(props) =>
        isloggedin && authToken && user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
