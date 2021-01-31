import React from 'react';
import history from '../../utils/history';
import useMarketType from '../hooks/useMarketType';
import classNames from 'classnames';
import { MarketTypes } from '../../enums/marketTypes.enum';

const MarketItemCard = ({ market }) => {
  function topImage() {
    const { images } = market;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

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

  const { pill } = useMarketType(marketType, marketPrice, threads, isOwned);

  function renderBlank() {
    return (
      <div className="column is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="/images/default.png" alt="" role="presentation" />
            </figure>
            <div className="has-text-right p-2 is-overlay">
              <span className="tag is-dark is-rounded">0</span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">Loading ...</p>
            <p className="subtitle is-size-6"></p>
          </div>
        </article>
      </div>
    );
  }

  if (!_id) return renderBlank();

  const cardClasses = classNames('card is-clickable', {
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

  function viewItem(e) {
    if (isOwned) {
      history.push(`/kitbag/market/${kitbag}/edit/${_id}`);
    } else {
      history.push(`/market/view/${_id}`);
    }
  }

  function deleteItem(e) {
    console.log('DELETE');
    /* <Link to={`/kitbag/kit/${kitbagId}/delete/${_id}`}> */
  }

  return (
    <div className="column is-4-tablet is-3-desktop is-2-fullhd">
      <article className={cardClasses} onClick={(e) => viewItem(e)}>
        {/* 
        <span
          className={`badge badge-pill ${
            isOwned ? `badge-light text-${color}` : `badge-${color}`
          } badge-fullsize badge-top-right`}
        >
          {pill}
        </span> */}
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={topImage()} alt={title} role="presentation" />
          </figure>
          <div className="has-text-right p-2 is-overlay">
            <span className="tag is-dark is-rounded">{pill}</span>
          </div>
          {isOwned && (
            <div className="has-text-left p-2 is-overlay">
              <span
                className="tag is-danger is-medium is-clickable"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(e);
                }}
              >
                <span
                  className="fas fa-trash-alt"
                  title="Delete kit item"
                ></span>
              </span>
            </div>
          )}
        </div>
        <div className="card-content">
          <p className="title is-size-5">{title}</p>
          {subtitle && <p className="subtitle is-size-6">{subtitle}</p>}
        </div>
      </article>
    </div>
  );
};

export default MarketItemCard;
