import React from 'react';
import { Link } from 'react-router-dom';
import Title from './includes/title/Title';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const Pricing = ({ auth, user }) => {
  const { loggedIn } = auth;
  const isStandard =
    user && user.package && user.package.name === 'standard' ? true : false;
  const isPremium =
    user && user.package && user.package.name === 'premium' ? true : false;

  return (
    <div>
      <Title title="Pricing & User Limitations" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4">
              <article className="card">
                <div className="card-header h4 text-center bg-bronze">
                  Free <span className="fas fa-star" title="Star tier"></span>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <p className="card-text text-center">add 50 kitbag items</p>
                  <p className="card-text text-center">add 50 market items</p>
                  <p className="card-text text-center">upload 100 photos</p>
                  <p className="card-text text-center">admin 1 account</p>
                  <p className="card-text text-center">join 1 account</p>
                  <p className="card-text text-center">admin 1 group</p>
                  <p className="card-text text-center">join 2 groups</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center">Absolutely nothing</p>
                  <hr />
                  <div className="d-flex">
                    <Link
                      to="/auth/signup"
                      className={`btn btn-primary mx-auto ${
                        loggedIn ? 'disabled' : ''
                      }`}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-4">
              <article className="card">
                <div className="card-header h4 text-center bg-silver">
                  Standard{' '}
                  <span className="fas fa-medal" title="Medal tier"></span>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <p className="card-text text-center">add 500 kitbag items</p>
                  <p className="card-text text-center">add 500 market items</p>
                  <p className="card-text text-center">upload 1000 photos</p>
                  <p className="card-text text-center">admin 2 account</p>
                  <p className="card-text text-center">join 3 account</p>
                  <p className="card-text text-center">admin 2 group</p>
                  <p className="card-text text-center">join 5 groups</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center text-linethru">
                    £20 / year
                  </p>
                  <hr />
                  <div className="d-flex">
                    <Link
                      to="/purchase/subscription/standard"
                      className={`btn btn-primary mx-auto ${
                        loggedIn && (isStandard || isPremium) ? 'disabled' : ''
                      }`}
                    >
                      Currently Free
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-4">
              <article className="card">
                <div className="card-header h4 text-center bg-gold">
                  Premium{' '}
                  <span className="fas fa-trophy" title="Trophy tier"></span>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <p className="card-text text-center">add 5000 kitbag items</p>
                  <p className="card-text text-center">add 5000 market items</p>
                  <p className="card-text text-center">upload 10000 photos</p>
                  <p className="card-text text-center">admin 3 account</p>
                  <p className="card-text text-center">join 5 account</p>
                  <p className="card-text text-center">admin 3 group</p>
                  <p className="card-text text-center">join 10 groups</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center">£50 / year</p>
                  <hr />
                  <div className="d-flex">
                    <Link
                      to="/purchase/subscription/premium"
                      className={`btn btn-outline-primary mx-auto ${
                        loggedIn && isPremium ? 'disabled' : ''
                      }`}
                    >
                      Purchase
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps)(Pricing);
