import React from 'react';
import Alert from '../includes/Alert';
import SignUpForm from '../auth/SignUpForm';
import { Link } from 'react-router-dom';

const LoggedOutLanding = () => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="jumbotron">
          <div className="container text-center">
            <div className="row">
              <div className="col-12 col-lg-6">
                <h1>YouthKitbag</h1>
                <h2 className="pb-3">Inventory, Trade, Report</h2>
                <h3 className="">school kit, club kit, team kit, any kit</h3>
                <h4 className="pb-5">
                  sports gear, musical instruments, school uniforms, more ...
                </h4>
              </div>
              <div className="col-12 col-lg-6">
                <div className="row">
                  <div className="col-12 col-lg-10 mb-3 mx-auto bg-dark text-white p-5 rounded-lg">
                    <Alert />
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <article className="card card-link card-b1">
                <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
                  10
                </span>
                <Link to="/auth/signup">
                  <img
                    className="card-img-top"
                    src="/images/homepage-innertubes.jpg"
                    alt="Example of innertubes in kitbag"
                    role="presentation"
                  />
                  <div className="card-body">
                    <h2 className="card-title">Kitbag Inventory</h2>
                    <p className="card-text bg-light">
                      Create multiple kitbags to keep a record of what sports,
                      musical, hobby or school equipment you own. Keep track of
                      expenditure, location and flag when replacement levels
                      low.
                    </p>
                  </div>
                </Link>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <article className="card card-link card-b1">
                <Link to="/auth/signup">
                  <img
                    className="card-img-top"
                    src="/images/homepage-family.jpg"
                    alt="Example of innertubes in kitbag"
                    role="presentation"
                  />
                  <div className="card-body">
                    <h2 className="card-title">Family Account</h2>
                    <p className="card-text bg-light">
                      Set up family or group account, so that multiple members
                      can access view and store equipment details. Share with
                      family members. Help the kids find and manage their own
                      kit!
                    </p>
                  </div>
                </Link>
              </article>
            </div>{' '}
            <div className="col-12 col-sm-6 col-md-3">
              <article className="card card-link card-b1">
                <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
                  10
                </span>
                <Link to="/auth/signup">
                  <img
                    className="card-img-top"
                    src="/images/homepage-club.jpg"
                    alt="Example of innertubes in kitbag"
                    role="presentation"
                  />
                  <div className="card-body">
                    <h2 className="card-title">Clubs &amp; Teams</h2>
                    <p className="card-text bg-light">
                      Create multiple kitbags to keep a record of what sports,
                      musical, hobby or school equipment you own. Share with
                      family members. Help the kids find and manage their own
                      kit!
                    </p>
                  </div>
                </Link>
              </article>
            </div>{' '}
            <div className="col-12 col-sm-6 col-md-3">
              <article className="card card-link card-b1">
                <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
                  10
                </span>
                <Link to="/auth/signup">
                  <img
                    className="card-img-top"
                    src="/images/homepage-innertubes.jpg"
                    alt="Example of innertubes in kitbag"
                    role="presentation"
                  />
                  <div className="card-body">
                    <h2 className="card-title">Trade &amp; Report</h2>
                    <p className="card-text bg-light">
                      Create multiple kitbags to keep a record of what sports,
                      musical, hobby or school equipment you own. Share with
                      family members. Help the kids find and manage their own
                      kit!
                    </p>
                  </div>
                </Link>
              </article>
            </div>{' '}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoggedOutLanding;
