import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';

const mapDispatchToProps = {
  fetchKitbagMarketItems,
};

const KitbagMarketAnnouncement = ({
  description,
  marketType,
  fetchKitbagMarketItems,
}) => {
  const marketItems = useSelector(
    (state) => state.kitbag.market[marketType]?.items
  );
  const totalItems = useSelector(
    (state) => state.kitbag.market[marketType]?.totalItems
  );

  useEffect(() => {
    fetchKitbagMarketItems({ by: marketType, pagesize: 5 });
  }, [marketType, fetchKitbagMarketItems]);

  // if (!group || !marketItems) return null;

  function topImage(images) {
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

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
    <article className="tile is-child notification is-success">
      <p className="title">Your {description}</p>
      <div className="content">
        <p>
          You currently have <span className="tag is-rounded">{0}</span> active{' '}
          {description}.
        </p>
        {/* <div>{renderList()}</div> */}
        <p>These are your most recently active {description}.</p>
      </div>
      <div className="buttons">
        <Link
          to="/market?searchfor=&by=trade&page=1&pagesize=24&excgroups=true"
          className="button is-success is-inverted"
        >
          View all your {description}
        </Link>
      </div>
    </article>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMarketAnnouncement);
