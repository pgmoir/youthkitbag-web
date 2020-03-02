import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';

const mapStateToProps = state => ({
  items: state.kitbag.market.wanteds
});

const mapDispatchToProps = {
  fetchKitbagMarketItems
};

const KitbagMarketWantedAnnouncement = ({
  group,
  items,
  fetchKitbagMarketItems
}) => {
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagMarketItems('wanted', 5);
  }, [fetchKitbagMarketItems]);

  function topImage(images) {
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  if (!group || !marketItems) return null;

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
      <div className="alert alert-secondary mb-0" role="alert">
        <h2 className="alert-heading">Your wanted items</h2>
        <div className="mb-1">{renderList()}</div>
        <p>These are your most recently active wanted items.</p>
        <p className="mb-1">
          <Link to="/market?searchfor=&by=wanted&page=1&pagesize=24">
            View all your wanted items
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitbagMarketWantedAnnouncement);
