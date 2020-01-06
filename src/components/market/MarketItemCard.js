import React from 'react';
import { Link } from 'react-router-dom';

class MarketItemCard extends React.Component {
  renderNotification() {
    if (!this.props.market) return null;
    const { isOwned, marketType, marketPrice, threads } = this.props.market;
    if (isOwned) {
      return threads.length;
    }
    if (['trade', 'wanted'].includes(marketType)) {
      if (!marketPrice || marketPrice === 0) return 'Free';
      return `£${marketPrice.toFixed(2)}`;
    }
    return marketType;
  }

  topImage() {
    const { images } = this.props.market;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  renderBlank() {
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

  render() {
    const { _id, title, subtitle, isOwned, marketType } = this.props.market;
    const accountId = this.props.accountId;

    if (!_id) return this.renderBlank();

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
            {this.renderNotification()}
          </span>
          <Link
            to={
              isOwned
                ? `/kitbag/market/${accountId}/edit/${_id}`
                : `/market/${accountId}/view/${_id}`
            }
          >
            <img
              className="card-img-top"
              src={this.topImage()}
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
  }
}

export default MarketItemCard;
