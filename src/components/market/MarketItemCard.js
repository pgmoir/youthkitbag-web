import React from 'react';
import { Link } from 'react-router-dom';
import useMarketType from '../hooks/useMarketType';
import classNames from 'classnames';
import { MarketTypes } from '../../enums/marketTypes.enum';

const MarketItemCard = ({ market }) => {
  const {
    _id,
    title,
    subtitle,
    isOwned,
    marketType,
    kitbag,
    marketPrice,
    threads,
  } = market;

  const { icon, iconTitle, color, pill } = useMarketType(
    marketType,
    marketPrice,
    threads,
    isOwned
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

  const cardClasses = classNames('card', {
    'has-background-primary': marketType === MarketTypes.TRADE,
    'has-background-success': marketType === MarketTypes.RECYCLE,
    'has-background-info': marketType === MarketTypes.WANTED,
    'has-background-warning': marketType === MarketTypes.LOST,
    'has-background-danger': marketType === MarketTypes.STOLEN,
    'has-text-primary-light': marketType === MarketTypes.TRADE,
    'has-text-success-light': marketType === MarketTypes.RECYCLE,
    'has-text-info-light': marketType === MarketTypes.WANTED,
    'has-text-warning-light': marketType === MarketTypes.LOST,
    'has-text-danger-light': marketType === MarketTypes.STOLEN,
  });

  return (
    <div className="column is-6-mobile is-4-tablet is-3-desktop is-2-fullhd">
      <article className={cardClasses}>
        {/* {isOwned && (
          <span className="icons-top-left pt-1">
            <Link to={`/kitbag/market/${kitbag}/delete/${_id}`}>
              <span
                className="icon-tray-item fas fa-trash-alt"
                title="Delete item"
              ></span>
            </Link>
          </span>
        )}
        <span
          className={`badge badge-pill ${
            isOwned ? `badge-light text-${color}` : `badge-${color}`
          } badge-fullsize badge-top-right`}
        >
          {pill}
        </span> */}
        <Link
          to={
            isOwned
              ? `/kitbag/market/${kitbag}/edit/${_id}`
              : `/market/view/${_id}`
          }
        >
          <div className="card-image">
            {' '}
            <figure className="image is-4by3">
              <img src={topImage()} alt={title} role="presentation" />
            </figure>
          </div>
        </Link>
        <div className="card-content">
          <p>{title}</p>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </article>
    </div>
  );
};

export default MarketItemCard;
