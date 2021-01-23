import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';
import { MarketTypes } from '../../enums/marketTypes.enum';

const mapStateToProps = (state) => ({
  totalItems: state.kitbag.market.wanteds.totalItems,
  items: state.kitbag.market.wanteds.items,
});

const mapDispatchToProps = {
  fetchKitbagMarketItems,
};

const KitbagMarketWantedAnnouncement = ({
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
    fetchKitbagMarketItems({ by: MarketTypes.WANTED, pagesize: 5 });
  }, [fetchKitbagMarketItems]);

  function topImage(images) {
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  // if (!group || !marketItems) return null;

  function renderList() {
    return marketItems.map((m, index) => {
      return (
        // <Link
        //   className="a-inherit"
        //   key={index}
        //   to={`/kitbag/market/${m.kitbag}/edit/${m._id}`}
        // >
        //   <div className="bg-white d-flex flex-row align-items-center mb-2">
        //     <div className="pl-1 py-1 pr-2">
        //       <img
        //         src={topImage(m.images)}
        //         alt=""
        //         className="img-fluid img-thumbnail img-small"
        //       />
        //     </div>
        //     <div className="">
        //       <h3 className="h6 ellipsis mb-0 mr-3">{m.title}</h3>
        //       <p className="mb-0">
        //         You have <strong>{m.threads.length}</strong> active threads
        //       </p>
        //     </div>
        //   </div>
        // </Link>
        <></>
      );
    });
  }

  return (
    <article className="card border-0">
      <h2 className="title is-4">Your wanted items</h2>
      <p>
        You currently have{' '}
        <span className={`badge badge-pill badge-dark`}>{totalItems}</span>{' '}
        active wanted items.
      </p>
      <div>{renderList()}</div>
      <p>These are your most recently active wanted items.</p>
      <div className="buttons">
        <Link
          to="/market?searchfor=&by=wanted&page=1&pagesize=24"
          className="button"
        >
          View all your wanted items
        </Link>
      </div>
    </article>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitbagMarketWantedAnnouncement);
