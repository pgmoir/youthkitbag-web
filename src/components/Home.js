import React from 'react';
import { connect } from 'react-redux';
import LoggedOutLanding from './home/LoggedOutLanding';
import LoggedInLanding from './home/LoggedInLanding';

const mapStateToProps = state => ({
  auth: state.auth
});

const Home = ({ auth }) => {
  return (
    <React.Fragment>
      {auth.loggedIn && <LoggedInLanding />}
      {!auth.loggedIn && <LoggedOutLanding />}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, null)(Home);
