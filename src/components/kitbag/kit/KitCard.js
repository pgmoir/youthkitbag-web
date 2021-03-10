import React, { useState } from 'react';
import history from '../../../utils/history';
import { getImage } from '../../../utils/image';
import { ImagesNav } from '../../includes/images';
import BlankCard from '../BlankCard';
import KitDelete from './KitDelete';

const KitCard = ({ kit, kitbagId, callback }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const {
    _id,
    title,
    subtitle,
    images,
    active,
    tags,
    activitys,
    inbag,
    purchases,
  } = kit;

  if (!kit?._id) return <BlankCard />;

  const showImage = getImage({ images, index: imageKey });

  function totalQuantity() {
    const { inbag } = kit;
    if (!inbag) {
      return 0;
    }
    return inbag.reduce(function (x, y) {
      return x + y.quantity;
    }, 0);
  }

  function viewItem() {
    history.push(`/kitbag/kit/${kitbagId}/edit/${_id}`);
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
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <div
          className="card is-clickable"
          onClick={() => viewItem()}
          onKeyPress={() => viewItem()}
          role="button"
          tabIndex="0"
        >
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={showImage} alt={title} role="presentation" />
            </figure>
            {active && (
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
                    title="Delete kit item"
                  ></span>
                </span>
              </div>
            )}
            <div className="has-text-right p-2 is-overlay-topright">
              <span className="tag is-dark is-rounded">{totalQuantity()}</span>
            </div>
            <ImagesNav
              images={images}
              imageKey={imageKey}
              setImageKey={setImageKey}
            />
          </div>
          <div className="card-content">
            <p className="title is-size-5">{title}</p>
            {subtitle && <p className="subtitle is-size-6">{subtitle}</p>}
            {(tags || activitys || inbag || purchases) && (
              <div className="tags m-0">
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
                {inbag?.map((bag, index) => {
                  return (
                    <span
                      key={index}
                      className="tag is-info is-clickable mb-2"
                      onClick={(e) => searchBy(e, bag.location, 'container')}
                      onKeyPress={(e) => searchBy(e, bag.location, 'container')}
                      role="button"
                      tabIndex={0}
                    >
                      {bag.location}
                    </span>
                  );
                })}
                {purchases?.map((purchase, index) => {
                  return (
                    <span
                      key={index}
                      className="tag is-danger is-clickable mb-2"
                      onClick={(e) => searchBy(e, purchase.from, 'source')}
                      onKeyPress={(e) => searchBy(e, purchase.from, 'source')}
                      role="button"
                      tabIndex={0}
                    >
                      {purchase.from}
                    </span>
                  );
                })}{' '}
              </div>
            )}
          </div>
        </div>
      </div>
      <KitDelete
        kitId={_id}
        kitbagId={kitbagId}
        title={title}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export default KitCard;
