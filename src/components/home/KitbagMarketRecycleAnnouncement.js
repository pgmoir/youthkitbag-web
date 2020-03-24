import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';

const mapStateToProps = state => ({
  totalItems: state.kitbag.market.recycles.totalItems,
  items: state.kitbag.market.recycles.items
});

const mapDispatchToProps = {
  fetchKitbagMarketItems
};

const KitbagMarketRecycleAnnouncement = ({
  group,
  items,
  totalItems,
  fetchKitbagMarketItems
}) => {
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagMarketItems('recycle', 5);
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
        <div
          key={index}
          className="bg-white d-flex flex-row align-items-center mb-2"
        >
          <div className="pl-1 py-1 pr-2">
            <img
              src={topImage(m.images)}
              alt="{m.title}"
              className="img-fluid img-thumbnail img-small"
            />
          </div>
          <div className="">
            <h3 className="h6 ellipsis mb-0">{m.title}</h3>
            <p className="mb-0">
              You have <strong>{m.threads.length}</strong> active threads
            </p>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="card border-0">
      <div className="alert alert-success mb-0" role="alert">
        <h2 className="alert-heading">Your recycling</h2>
        <p>You currently have {totalItems} active recycle items.</p>
        <div className="mb-3">{renderList()}</div>
        <p>These are your most recently active recycling items.</p>
        <p className="mb-1">
          <Link to={`/market?searchfor=&by=recycle&page=1&pagesize=24`}>
            View all your recycling
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitbagMarketRecycleAnnouncement);
