import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { fetchKitbagMarketItems } from '../../actions/KitbagMarketActions';
import { getFirstImageExcludeDeleted } from '../../utils/image';

const mapDispatchToProps = {
  fetchKitbagMarketItems,
};

const KitbagMarketAnnouncement = ({
  description,
  marketType,
  fetchKitbagMarketItems,
}) => {
  const history = useHistory();
  const marketTypeKey = `${marketType.toLowerCase()}s`;
  const { items, totalItems } = useSelector(
    (state) => state.kitbag.market[marketTypeKey]
  );

  useEffect(() => {
    fetchKitbagMarketItems({ by: marketType, pagesize: 5 });
  }, [marketType, fetchKitbagMarketItems]);

  if (!totalItems || totalItems === 0) return null;

  function topImage(images) {
    return getFirstImageExcludeDeleted({ images });
  }

  function viewMarketItem(item) {
    history.push(`/kitbag/market/${item.kitbag}/edit/${item._id}`);
  }

  //TODO: This still does funny things at certain widths - but not at all small widths
  // only when in multi column mode.
  function renderList() {
    return items?.map((item, index) => {
      return (
        <div
          key={index}
          className="box is-flex is-clickable p-3"
          role="button"
          onClick={() => viewMarketItem(item)}
          onKeyPress={() => viewMarketItem(item)}
          tabIndex="0"
        >
          <div className="is-flex-shrink-0 is-flex-grow-0 pr-4">
            <div className="image">
              <img
                src={topImage(item.images)}
                className="is-avatar is-48x48"
                alt=""
              />
            </div>
          </div>
          <div className="is-flex-shrink-1 is-flex-grow-1 is-flex is-flex-direction-column has-text-black has-truncated">
            <div className="has-text-weight-medium">{item.title}</div>
            <div className="is-truncated-text">{`You have ${item.threads.length} active threads`}</div>
          </div>
        </div>
      );
    });
  }

  return (
    <article className="notification is-success box">
      <h2 className="title">Your {description}</h2>
      <div className="content">
        <p>
          You currently have{' '}
          <span className="tag is-rounded">{totalItems || 0}</span> active{' '}
          {description}.
        </p>
        {renderList()}
        <p>These are your most recently active {description}.</p>
      </div>
      <div className="buttons">
        <Link
          to={`/market?searchfor=&by=${marketType}&page=1&pagesize=24&excgroups=true`}
          className="button is-success is-inverted"
        >
          View all your {description}
        </Link>
      </div>
    </article>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMarketAnnouncement);
