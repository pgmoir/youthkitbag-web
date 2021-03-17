import React, { useState } from 'react';
import history from '../../utils/history';
import useMarketType from '../hooks/useMarketType';
import BlankCard from '../kitbag/BlankCard';
import MarketItemDelete from '../kitbag/market/MarketItemDelete';
import { getImage } from '../../utils/image';
import { ImagesNav } from '../includes/images';

const MarketItemRow = ({ market, callback }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const {
    _id,
    title,
    subtitle,
    isOwned,
    marketType,
    kitbag,
    marketPrice,
    images,
    activitys,
    tags,
    threads,
    deleted,
  } = market;

  const { pill, color, hasMarketType } = useMarketType({
    marketId: _id,
    marketType,
    marketPrice,
    threads,
    isOwned,
  });

  if (!market?._id) return <BlankCard />;

  const showImage = getImage({ images, index: imageKey });

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

  function searchBy(e, searchfor, by) {
    e.stopPropagation();
    callback({
      searchfor,
      by,
      page: 1,
      pagesize: 24,
      order: 'updatedAt',
      direction: -1,
    });
  }

  return (
    <>
      <div
        className="is-flex is-clickable has-background-light mb-2"
        onClick={() => viewItem()}
        onKeyPress={() => viewItem()}
        role="button"
        tabIndex="0"
      >
        <div className="is-flex-shrink-0 is-flex-grow-0 row-image">
          <figure className="image is-extralarge">
            <img src={showImage} alt={title} role="presentation" />
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
            <span className={`tag is-${color} is-rounded is-size-6`}>
              {pill}
            </span>
          </div>
          <ImagesNav
            images={images}
            imageKey={imageKey}
            setImageKey={setImageKey}
          />
        </div>
        <div className="is-flex-shrink-1 is-flex-grow-1 is-flex is-flex-direction-column has-text-black has-truncated">
          <div className="is-truncated-text has-text-weight-medium is-size-4 mx-3 mt-2">
            {title}
          </div>
          {subtitle && (
            <div className="is-truncated-text is-size-5 mx-3">{subtitle}</div>
          )}
          <div className="tags mx-3 mt-2 mb-0">
            <span
              className="tag is-info is-clickable mb-2"
              onClick={(e) => searchBy(e, '', hasMarketType)}
              onKeyPress={(e) => searchBy(e, '', hasMarketType)}
              role="button"
              tabIndex={0}
            >
              {hasMarketType}
            </span>
            {tags?.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="tag is-warning is-clickable mb-2"
                  onClick={(e) => searchBy(e, tag, 'tag')}
                  onKeyPress={(e) => searchBy(e, tag, 'tag')}
                  role="button"
                  tabIndex={0}
                >
                  {tag}
                </span>
              );
            })}
            {activitys?.map((activity, index) => {
              return (
                <span
                  key={index}
                  className="tag is-success is-clickable mb-2"
                  onClick={(e) => searchBy(e, activity, 'activity')}
                  onKeyPress={(e) => searchBy(e, activity, 'activity')}
                  role="button"
                  tabIndex={0}
                >
                  {activity}
                </span>
              );
            })}
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

export default MarketItemRow;
