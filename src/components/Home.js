import React from 'react';
import { connect } from 'react-redux';
import LoggedOutLanding from './home/LoggedOutLanding';
import LoggedInLanding from './home/LoggedInLanding';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const Home = ({ auth }) => {
  return (
    <>
      {auth.loggedIn && <LoggedInLanding />}
      {!auth.loggedIn && <LoggedOutLanding />}
    </>
  );
};

export default connect(mapStateToProps)(Home);
