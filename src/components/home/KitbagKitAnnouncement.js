import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DisplayedItem from './DisplayedItem';

const KitbagKitAnnouncement = ({ kitbagId, created }) => {
  const history = useHistory();
  const { recent } = useSelector((state) => state.kitbag.kit);

  if (!kitbagId) return null;

  function viewKitItem(item) {
    history.push(`/kitbag/kit/${kitbagId}/edit/${item._id}`);
  }

  function renderList(items) {
    return items?.map((item, index) => {
      return (
        <DisplayedItem
          key={index}
          index={index}
          clickAction={() => viewKitItem(item)}
          images={item.images}
          title={item.title}
          subtext={item.subtitle}
        />
      );
    });
  }

  return (
    <article className="notification is-notification-even is-success box">
      <h2 className="title">
        {created ? 'Kitbag additions' : 'Kitbag updates'}
      </h2>
      {created && recent.createdCount > 0 && (
        <div className="content">
          <p>
            There have been{' '}
            <span className="tag is-rounded">{recent.createdCount}</span> items
            added to your kitbag in the last{' '}
            <span className="tag is-rounded">{recent.createdDays}</span> days.
          </p>
          {renderList(recent.createdItems)}
        </div>
      )}
      {created && recent.createdCount === 0 && (
        <div className="content">
          <p>
            There have been <span className="tag is-rounded">NO</span> items
            added to your kitbag in the last{' '}
            <span className="tag is-rounded">{recent.createdDays}</span> days.
          </p>
          <p>
            Click on the link below to access your kitbag and add some more.
          </p>
        </div>
      )}
      {!created && recent.updatedCount > 0 && (
        <div className="content">
          <p>
            There have been{' '}
            <span className="tag is-rounded">{recent.updatedCount}</span> items
            updated in your kitbag in the last{' '}
            <span className="tag is-rounded">{recent.updatedDays}</span> days.
          </p>
          {renderList(recent.updatedItems)}
        </div>
      )}
      {!created && recent.createdCount === 0 && (
        <div className="content">
          <p>
            There have been <span className="tag is-rounded">NO</span> items
            updated to your kitbag in the last{' '}
            <span className="tag is-rounded">{recent.createdDays}</span> days.
          </p>
          <p>
            Click on the link below to access your kitbag and update some items.
          </p>
        </div>
      )}
      <div className="buttons">
        <Link
          className="button is-success is-inverted"
          to={`/kitbag/kit/${kitbagId}`}
        >
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitAnnouncement;
