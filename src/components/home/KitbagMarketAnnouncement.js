import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DisplayedItem from './DisplayedItem';

const KitbagMarketAnnouncement = ({ description, marketType }) => {
  const history = useHistory();
  const marketTypeKey = `${marketType.toLowerCase()}s`;
  const { items, totalItems } = useSelector(
    (state) => state.kitbag.market[marketTypeKey]
  );

  if (!totalItems || totalItems === 0) return null;

  function viewMarketItem(item) {
    history.push(`/kitbag/market/${item.kitbag}/edit/${item._id}`);
  }

  function renderList() {
    return items?.map((item, index) => {
      return (
        <DisplayedItem
          key={item._id}
          index={index}
          clickAction={() => viewMarketItem(item)}
          images={item.images}
          title={item.title}
          subtext={`You have ${item.threads.length} active threads`}
        />
      );
    });
  }

  return (
    <article className="notification is-notification-even is-success box">
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

export default KitbagMarketAnnouncement;
