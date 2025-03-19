import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import User from './auth/User';
import ScrollToTop from './ScrollToTop';

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Helmet title="YouthKitbag - Inventory, Trade, Aquire, Reporting for all your youth kit">
      </Helmet>
      <BrowserRouter>
        <ScrollToTop />
        <User />
        <AppRouter auth={auth} />
      </BrowserRouter>
    </>
  );
};

export default App;
