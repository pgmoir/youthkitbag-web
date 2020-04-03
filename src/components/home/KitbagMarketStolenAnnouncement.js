import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';

const mapStateToProps = (state) => ({
  totalItems: state.kitbag.market.stolens.totalItems,
  items: state.kitbag.market.stolens.items,
});

const mapDispatchToProps = {
  fetchKitbagMarketItems,
};

const KitbagMarketStolenAnnouncement = ({
  group,
  items,
  totalItems,
  fetchKitbagMarketItems,
}) => {
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagMarketItems('stolen', 5);
  }, [fetchKitbagMarketItems]);

  function topImage(images) {
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  if (!group || !marketItems || totalItems === 0) return null;

  function renderList() {
    return marketItems.map((m, index) => {
      return (
        <Link
          className="a-inherit"
          key={index}
          to={`/kitbag/market/${m.account}/edit/${m._id}`}
        >
          <div className="bg-white d-flex flex-row align-items-center mb-2">
            <div className="pl-1 py-1 pr-2">
              <img
                src={topImage(m.images)}
                alt="{m.title}"
                className="img-fluid img-thumbnail img-small"
              />
            </div>
            <div className="">
              <h3 className="h6 ellipsis mb-0 mr-3">{m.title}</h3>
              <p className="mb-0">
                You have <strong>{m.threads.length}</strong> active threads
              </p>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="card border-0">
      <div className="alert alert-danger mb-0" role="alert">
        <h2 className="alert-heading">Your stolen items</h2>
        <p>
          You currently have{' '}
          <span className={`badge badge-pill badge-dark`}>{totalItems}</span>{' '}
          active reported stolen items.
        </p>
        <div className="mb-3">{renderList()}</div>
        <p>These are your most recently active stolen items.</p>
        <p className="mb-1">
          <Link to="/market?searchfor=&by=stolen&page=1&pagesize=24">
            View all your stolen items
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitbagMarketStolenAnnouncement);
