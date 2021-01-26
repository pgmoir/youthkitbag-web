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
      <div className="column">
        <article key={_id} className="panel is-primary">
          <div className={`panel-heading bg-${themes[level]}`}>
            {name} <span className={icon} title={`${name} tier`}></span>
          </div>
          {cost < defaultCost && (
            <p className="panel-block has-text-centered offer-highlight">
              <strong>
                Best Offer
                <br />
                {title}
              </strong>
            </p>
          )}
          <p className="panel-block has-text-centered">
            up to {kit} kitbag items
          </p>
          <p className="panel-block has-text-centered">
            up to {market} market items
          </p>
          <p className="panel-block has-text-centered">up to {photos} photos</p>
          <p className="panel-block has-text-centered">
            admin {kitbagAdmins} kitbags
          </p>
          <p className="panel-block has-text-centered">
            join {kitbags} kitbags
          </p>
          <p className="panel-block has-text-centered">
            admin {groupAdmins} groups
          </p>
          <p className="panel-block has-text-centered">join {groups} groups</p>
          <p className="panel-block has-text-centered mb-3">Cost</p>
          <p
            className={`panel-block has-text-centered ${
              cost < defaultCost ? 'text-linethru' : ''
            }`}
          >
            {cost === 0 ? 'FREE' : `£${Number(defaultCost).toFixed(2)} / year`}
          </p>
          {cost < defaultCost && (
            <p className="panel-block has-text-centered">
              Reduced to £{Number(cost).toFixed(2)} / year
            </p>
          )}
          <p className="panel-block">
            <Link
              to={!loggedIn ? '/auth/signup' : `/bundles/purchase/${_id}`}
              className={`button is-success ${
                disabledButton ? 'disabled' : ''
              }`}
            >
              {level === 0 ? 'Sign Up' : 'Upgrade'}
            </Link>
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="container">
      <Title title="Bundles & Benefits" />
      <div className="columns">{bundles.map((p) => renderBundle(p))}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
