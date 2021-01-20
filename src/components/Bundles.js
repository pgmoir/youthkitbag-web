import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from './includes/title/Title';
import { connect } from 'react-redux';
import { fetchBundles } from '../actions/BundlesActions';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  bundles: state.bundles.items,
});

const mapDispatchToProps = {
  fetchBundles,
};

const Bundles = ({ auth, user, bundles, fetchBundles }) => {
  useEffect(() => {
    fetchBundles({ user });
  }, [user, fetchBundles]);

  const themes = ['bronze', 'silver', 'gold'];

  const { loggedIn } = auth;

  if (!bundles || bundles.length === 0) return null;

  function renderBundle(p) {
    const {
      _id,
      level,
      cost,
      defaultCost,
      kit,
      market,
      photos,
      kitbagAdmins,
      kitbags,
      groupAdmins,
      groups,
      name,
      icon,
      title,
    } = p;

    const theme =
      !user || !user.bundle || !user.bundle.theme ? null : user.bundle.theme;

    const disabledButton = !theme
      ? false
      : level <= themes.indexOf(user.bundle.theme);

    return (
      <div className="col-12 col-sm-4" key={_id}>
        <article className="card">
          <div className={`card-header h4 text-center bg-${themes[level]}`}>
            {name} <span className={icon} title={`${name} tier`}></span>
          </div>
          <img className="card-img" src="" alt="" role="presentation" />
          <div className="card-body">
            {cost < defaultCost && (
              <p className="card-text text-center offer-highlight">
                <strong>
                  Best Offer
                  <br />
                  {title}
                </strong>
              </p>
            )}
            <p className="card-text text-center">up to {kit} kitbag items</p>
            <p className="card-text text-center">up to {market} market items</p>
            <p className="card-text text-center">up to {photos} photos</p>
            <p className="card-text text-center">
              admin {kitbagAdmins} kitbags
            </p>
            <p className="card-text text-center">join {kitbags} kitbags</p>
            <p className="card-text text-center">admin {groupAdmins} groups</p>
            <p className="card-text text-center">join {groups} groups</p>
            <hr />
            <h5 className="text-center mb-3">Cost</h5>
            <p
              className={`card-text text-center ${
                cost < defaultCost ? 'text-linethru' : ''
              }`}
            >
              {cost === 0
                ? 'FREE'
                : `£${Number(defaultCost).toFixed(2)} / year`}
            </p>
            {cost < defaultCost && (
              <p className="card-text text-center">
                Reduced to £{Number(cost).toFixed(2)} / year
              </p>
            )}
            <hr />
            <div className="d-flex">
              <Link
                to={!loggedIn ? '/auth/signup' : `/bundles/purchase/${_id}`}
                className={`btn btn-primary mx-auto ${
                  disabledButton ? 'disabled' : ''
                }`}
              >
                {level === 0 ? 'Sign Up' : 'Upgrade'}
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <Title title="Bundles & Benefits" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">{bundles.map((p) => renderBundle(p))}</div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
