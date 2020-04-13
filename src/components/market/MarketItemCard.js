import React from 'react';
import { Link } from 'react-router-dom';
import useMarketType from '../hooks/useMarketType';

const MarketItemCard = ({ market }) => {
  const {
    _id,
    title,
    subtitle,
    isOwned,
    marketType,
    account,
    marketPrice,
    threads,
  } = market;

  const { icon, iconTitle, color, pill } = useMarketType(
    marketType,
    marketPrice
  );

  function topImage() {
    const { images } = market;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  function renderBlank() {
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <div className="d-flex">
            <div className="blank-square bg-light" />
          </div>
          <div className="card-body">
            <h3 className="card-title h6 ellipsis bg-light hgt-2">&nbsp;</h3>
            <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
          </div>
        </article>
      </div>
    );
  }

  if (!_id) return renderBlank();

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <article className="card card-link card-b1">
        {isOwned && (
          <span className="icons-top-left pt-1">
            <Link to={`/kitbag/market/${account}/delete/${_id}`}>
              <span
                className="icon-tray-item fas fa-trash-alt"
                title="Delete item"
              ></span>
            </Link>
          </span>
        )}
        <span
          className={`badge badge-pill badge-${color} badge-fullsize badge-top-right`}
        >
          {`${pill}${isOwned ? ` / ${threads.length}` : ''}`}
        </span>
        <Link
          to={
            isOwned
              ? `/kitbag/market/${account}/edit/${_id}`
              : `/market/view/${_id}`
          }
        >
          <img
            className="card-img-top"
            src={topImage()}
            alt={title}
            role="presentation"
          />
          <div className="card-body">
            <h3 className={`card-title h6 ellipsis text-${color}`}>
              <span className={`${icon} pr-2`} title={iconTitle}></span>
              {title}
            </h3>
            {subtitle && <p className="card-text ellipsis">{subtitle}</p>}
          </div>
        </Link>
      </article>
    </div>
  );
};

export default MarketItemCard;
