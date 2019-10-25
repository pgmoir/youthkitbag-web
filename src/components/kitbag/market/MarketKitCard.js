import React from 'react';
import { Link } from 'react-router-dom';

class MarketKitCard extends React.Component {
  renderNotificationCount() {
    if (!this.props.market) return 0;
    return this.props.market.threads..length;
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
    const { _id, title, subtitle } = this.props.market;

    if (!_id) return this.renderBlank();

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="icons-top-left pt-1">
            <Link to={`/kitbag/market/delete/${_id}`}>
              <span className="icon-tray-item fas fa-trash-alt"></span>
            </Link>
          </span>
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
            {this.renderNotificationCount()}
          </span>
          <Link to={`/kitbag/market/edit/${_id}`}>
            <img
              className="card-img-top"
              src={this.topImage()}
              alt={title}
              role="presentation"
            />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{title}</h3>
              {subtitle && <p className="card-text ellipsis">{subtitle}</p>}
            </div>
          </Link>
        </article>
      </div>
    );
  }
}

export default MarketKitCard;
