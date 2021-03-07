import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchRecentKitbagKits } from '../../actions';
import DisplayedItem from './DisplayedItem';

const mapDispatchToProps = {
  fetchRecentKitbagKits,
};

const KitbagKitAnnouncement = ({
  kitbagId,
  created,
  fetchRecentKitbagKits,
}) => {
  const history = useHistory();
  const { recent } = useSelector((state) => state.kitbag.kit);

  useEffect(() => {
    console.log('UEFF', kitbagId);
    if (kitbagId) {
      fetchRecentKitbagKits({ created, days: 7, kitbagId });
    }
  }, [fetchRecentKitbagKits, created, kitbagId]);

  if (!kitbagId) return null;

  if (recent.createdCount === 0 && recent.updatedCount === 0) return null;

  function viewKitItem(item) {
    history.push(`/kitbag/${item.kitbag}/edit/${item._id}`);
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

export default connect(null, mapDispatchToProps)(KitbagKitAnnouncement);
