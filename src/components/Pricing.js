import React from 'react';
import { Link } from 'react-router-dom';

import Title from './includes/title/Title';

const Pricing = () => {
  return (
    <div>
      <Title title="Pricing" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <article className="card">
                <div className="card-header h4 text-center">
                  Free <i className="fas fa-coffee"></i>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <h5 className="text-center mb-3">Size of Kitbag</h5>
                  <p className="card-text text-center">
                    20 items in private kitbag
                  </p>
                  <p className="card-text text-center">
                    5 items listed for sale
                  </p>
                  <p className="card-text text-center">
                    5 items listed as wanted
                  </p>
                  <p className="card-text text-center">2 photos per item</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center">Absolutely nothing</p>
                  <hr />
                  <div className="d-flex">
                    <Link to="/auth/signup" className="btn btn-primary mx-auto">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="card">
                <div className="card-header h4 text-center">
                  Standard <i className="fas fa-beer"></i>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <h5 className="text-center mb-3">Size of Kitbag</h5>
                  <p className="card-text text-center">
                    100 items in private kitbag
                  </p>
                  <p className="card-text text-center">
                    25 items listed for sale
                  </p>
                  <p className="card-text text-center">
                    25 items listed as wanted
                  </p>
                  <p className="card-text text-center">5 photos per item</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center">£2 / month</p>
                  <hr />
                  <div className="d-flex">
                    <Link
                      to="/purchase/subscription/standard"
                      className="btn btn-primary mx-auto"
                    >
                      Purchase
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="card">
                <div className="card-header h4 text-center">
                  Premium <i className="fas fa-cocktail"></i>
                </div>
                <img className="card-img" src="" alt="" role="presentation" />
                <div className="card-body">
                  <h5 className="text-center mb-3">Size of Kitbag</h5>
                  <p className="card-text text-center">
                    1000 items in private kitbag
                  </p>
                  <p className="card-text text-center">
                    100 items listed for sale
                  </p>
                  <p className="card-text text-center">
                    100 items listed as wanted
                  </p>
                  <p className="card-text text-center">10 photos per item</p>
                  <hr />
                  <h5 className="text-center mb-3">Cost</h5>
                  <p className="card-text text-center">£5 / month</p>
                  <hr />
                  <div className="d-flex">
                    <Link
                      to="/purchase/subscription/premium"
                      className="btn btn-primary mx-auto"
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

export default Pricing;
