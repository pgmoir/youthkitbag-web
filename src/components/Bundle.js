import React from 'react';
import { Link } from 'react-router-dom';

const Bundle = ({ loggedIn, user, bundle }) => {
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
  } = bundle;

  const themes = ['bronze', 'silver', 'gold'];

  const theme =
    !user || !user.bundle || !user.bundle.theme ? null : user.bundle.theme;

  const disabledButton = !theme
    ? false
    : level <= themes.indexOf(user.bundle.theme);

  return (
    <div className="column has-text-centered">
      <article className="panel is-primary">
        <div className={`panel-heading bg-${themes[level]}`}>
          {name} <span className={icon} title={`${name} tier`}></span>
        </div>
        {cost < defaultCost && (
          <p className="panel-block py-3 is-block offer-highlight">
            <strong>
              Best Offer
              <br />
              {title}
            </strong>
          </p>
        )}
        <p className="panel-block py-3 is-block">{`up to ${kit} kitbag items`}</p>
        <p className="panel-block py-3 is-block">{`up to ${market} market items`}</p>
        <p className="panel-block py-3 is-block">{`up to ${photos} photos`}</p>
        <p className="panel-block py-3 is-block">
          {`admin ${kitbagAdmins} kitbags`}
        </p>
        <p className="panel-block py-3 is-block">{`join ${kitbags} kitbags`}</p>
        <p className="panel-block py-3 is-block">{`admin ${groupAdmins} groups`}</p>
        <p className="panel-block py-3 is-block">{`join ${groups} groups`}</p>
        <p
          className={`panel-block py-3 is-block ${
            cost < defaultCost ? 'text-linethru' : 'has-text-weight-bold'
          }`}
        >
          {cost === 0 ? 'FREE' : `£${Number(defaultCost).toFixed(2)} / year`}
        </p>
        {cost < defaultCost && (
          <p className="panel-block py-3 is-block has-text-weight-bold">
            {`Reduced to £{Number(cost).toFixed(2)} / year`}
          </p>
        )}
        <p className="panel-block py-5 is-block">
          <Link
            to={!loggedIn ? '/auth/signup' : `/bundles/purchase/${_id}`}
            className={`button is-success ${disabledButton ? 'disabled' : ''}`}
          >
            {level === 0 ? 'Sign Up' : 'Upgrade'}
          </Link>
        </p>
      </article>
    </div>
  );
};

export default Bundle;
