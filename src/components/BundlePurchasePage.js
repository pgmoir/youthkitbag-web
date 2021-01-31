import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBundle } from '../actions/BundlesActions';
import Title from './includes/title/Title';
import Alert from './includes/Alert';

const mapStateToProps = (state) => ({
  selected: state.bundles.selected,
});

const mapDispatchToProps = {
  fetchBundle,
};

const BundlePurchasePage = ({ selected, fetchBundle, match }) => {
  const bundleId = match.params.bundleId;

  const [bundle, setBundle] = useState({
    title: 'Loading bundle details ...',
    description: '',
    details: [],
    price: 0.0,
  });

  useEffect(() => {
    fetchBundle(bundleId);
  }, [fetchBundle, bundleId]);

  useEffect(() => {
    if (selected && selected._id) {
      setBundle(selected);
    }
  }, [selected]);

  return (
    <div>
      <Title title="Purchase bundle" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12">
              <h4>Purchase {bundle.title} bundle</h4>
            </div>
          </div>
          <h3>Total Price: £{Number(bundle.price).toFixed(2)}</h3>
          <hr />
          <div className="row pb-3">
            <div className="col-12 d-flex justify-content-end">
              <Link to="/bundles" className="btn btn-secondary mr-3">
                Cancel and Return to Shop
              </Link>
              {/* <form onSubmit={this.onFormSubmit}>
                <script
                  src="https://checkout.stripe.com/checkout.js"
                  className="stripe-button"
                  data-key="pk_test_GrVrOqLyxwRIBFfaYw3oGQA4006DOxfIft"
                  data-amount={this.props.totalPrice * 100}
                  data-name="Moir Consultancy Limited"
                  data-description="Your bundle purchase from YouthKitbag"
                  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                  data-locale="auto"
                  data-currency="gbp"
                ></script>
              </form> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BundlePurchasePage);
