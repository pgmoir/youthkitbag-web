import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  const location = useLocation();
  const { kitbagId, groupId, email } = queryString.parse(location.search);

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <SignUpForm kitbagId={kitbagId} groupId={groupId} email={email} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
