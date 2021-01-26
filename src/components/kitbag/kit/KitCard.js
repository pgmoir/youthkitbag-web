import React from 'react';
import { Link } from 'react-router-dom';

const KitCard = ({ kit, kitbagId }) => {
  function totalQuantity() {
    const { inbag } = kit;
    if (!inbag) {
      return 0;
    }
    return inbag.reduce(function (x, y) {
      return x + y.quantity;
    }, 0);
  }

  function topImage() {
    const { images } = kit;
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

  const { _id, title, subtitle } = kit;

  if (!_id) return renderBlank();

  return (
    <div className="column is-6-mobile is-4-tablet is-3-desktop is-2-fullhd">
      <article className="card">
        {/* <span className="icons-top-left pt-1">
          <Link to={`/kitbag/kit/${kitbagId}/delete/${_id}`}>
            <span
              className="icon-tray-item fas fa-trash-alt"
              title="Delete kit item"
            ></span>
          </Link>
        </span>
        <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
          {totalQuantity()}
        </span> */}
        <Link to={`/kitbag/kit/${kitbagId}/edit/${_id}`}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage()} alt={title} role="presentation" />
            </figure>
          </div>
        </Link>
        <div className="card-content">
          <p>
            <strong>{title}</strong>
          </p>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </article>
    </div>
  );
};

export default KitCard;
