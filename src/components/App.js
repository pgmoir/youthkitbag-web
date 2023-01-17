import React from 'react';
import { Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import history from '../utils/history';
import User from './auth/User';
import ScrollToTop from './ScrollToTop';
import AppRouter from './AppRouter';

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Helmet>
        <title>
          YouthKitbag - Inventory, Trade, Aquire, Reporting for all your youth
          kit
        </title>
      </Helmet>
      <Router history={history}>
        <ScrollToTop />
        <User />
        <AppRouter auth={auth} />
      </Router>
    </>
  );
};

export default App;
