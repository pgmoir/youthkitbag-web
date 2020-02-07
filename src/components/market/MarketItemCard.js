import React from 'react';
import { Link } from 'react-router-dom';

const MarketItemCard = ({ market }) => {
  function renderNotification() {
    if (!market) return null;
    const { isOwned, marketType, marketPrice, threads } = market;
    if (isOwned) {
      return threads.length;
    }
    if (['trade', 'wanted'].includes(marketType)) {
      if (!marketPrice || marketPrice === 0) return 'Free';
      return `£${marketPrice.toFixed(2)}`;
    }
    return marketType;
  }

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

  const { _id, title, subtitle, isOwned, marketType, account } = market;

  if (!_id) return renderBlank();

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <article className="card card-link card-b1">
        {isOwned && (
          <span className="icons-top-left pt-1">
            <Link to={`/kitbag/market/${account}/delete/${_id}`}>
              <span className="icon-tray-item fas fa-trash-alt"></span>
            </Link>
          </span>
        )}
        <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
          {renderNotification()}
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
            <h3 className="card-title h6 ellipsis">{`${marketType.toUpperCase()} - ${title}`}</h3>
            {subtitle && <p className="card-text ellipsis">{subtitle}</p>}
          </div>
        </Link>
      </article>
    </div>
  );
};

export default MarketItemCard;
