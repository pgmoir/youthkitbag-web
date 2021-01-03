import React from 'react';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import ResetForm from './ResetForm';
import { Link } from 'react-router-dom';

const ResetPage = () => {
  return (
    <div>
      <Title title="Reset your password" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <p className="lead">
            If you have forgotten your password, then enter your email here and
            you will be sent a link to create a new password. Please be aware
            that this link is time limited, and will expire in an hour after
            sending. If actually you know you&apos;re password,{' '}
            <Link to="/auth/login">login direct to your kitbag</Link>.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mx-auto">
              <Alert />
              <ResetForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPage;
