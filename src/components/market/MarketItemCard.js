import React, { useState } from 'react';
import history from '../../utils/history';
import useMarketType from '../hooks/useMarketType';
import classNames from 'classnames';
import { MarketTypes } from '../../enums/marketTypes.enum';
import BlankCard from '../kitbag/BlankCard';
import MarketItemDelete from '../kitbag/market/MarketItemDelete';

const MarketItemCard = ({ market }) => {
  const [modalIsActive, setModalIsActive] = useState(false);

  const {
    _id,
    title,
    subtitle,
    isOwned,
    marketType,
    kitbag,
    marketPrice,
    threads,
    deleted,
  } = market;

  const { pill } = useMarketType(marketType, marketPrice, threads, isOwned);

  if (!market?._id) return <BlankCard />;

  function topImage() {
    const { images } = market;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

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

  function viewItem() {
    if (isOwned) {
      history.push(`/kitbag/market/${kitbag}/edit/${_id}`);
    } else {
      history.push(`/market/view/${_id}`);
    }
  }

  function deleteItem(e) {
    e.stopPropagation();
    setModalIsActive(true);
  }

  return (
    <>
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <div
          className={cardClasses}
          onClick={() => viewItem()}
          onKeyPress={() => viewItem()}
          role="button"
          tabIndex="0"
        >
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage()} alt={title} role="presentation" />
            </figure>
            {isOwned && !deleted && (
              <div className="has-text-left p-2 is-overlay-topleft">
                <span
                  className="tag is-danger is-medium is-clickable"
                  onClick={(e) => {
                    deleteItem(e);
                  }}
                  onKeyPress={(e) => {
                    deleteItem(e);
                  }}
                  role="button"
                  tabIndex="0"
                >
                  <span
                    className="fas fa-trash-alt"
                    title="Delete market item"
                  ></span>
                </span>
              </div>
            )}
            <div className="has-text-right p-2 is-overlay-topright">
              <span className="tag is-dark is-rounded">{pill}</span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">{title}</p>
            {subtitle && <p className="subtitle is-size-6">{subtitle}</p>}
          </div>
        </div>
      </div>
      <MarketItemDelete
        marketId={_id}
        kitbagId={kitbag}
        title={title}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export default MarketItemCard;
