import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';

const mapStateToProps = state => ({
  items: Object.values(state.kitbag.market.list)
});

const mapDispatchToProps = {
  fetchKitbagMarketItems
};

const KitbagMarketAnnouncement = ({ group, items, fetchKitbagMarketItems }) => {
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagMarketItems();
  }, [fetchKitbagMarketItems]);

  if (!group || !marketItems) return null;

  function renderList() {
    return marketItems.map((m, index) => {
      return <h5 key={index}>{m.title}</h5>;
    });
  }

  return (
    <div className="card border-0">
      <div className="alert alert-warning mb-0" role="alert">
        <h2 className="alert-heading">Kitbag market activity</h2>
        <hr />
        <p>The following items have recently been traded in your kitbag.</p>
        {renderList()}
        <p>You have the following responses to action.</p>
        <Link className="btn btn-warning" to={`/kmarket`}>
          View kitbag
        </Link>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitbagMarketAnnouncement);
