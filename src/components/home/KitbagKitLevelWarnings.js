import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DisplayedItem from './DisplayedItem';

const KitbagKitLevelWarnings = ({ kitbagId }) => {
  const navigate = useNavigate();
  const { warnings } = useSelector((state) => state.kitbag.kit);

  if (!kitbagId) return null;

  if (warnings.length === 0) return null;

  function viewKitItem(item) {
    return navigate(`/kitbag/kit/${kitbagId}/edit/${item._id}`);
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
    <article className="notification is-notification-even is-danger box">
      <h2 className="title">Kit level warnings</h2>
      <div className="content">
        <p>
          You have the following items at warning level. Please order new stock
          to ensure you&apos;re not caught out.
        </p>
        {renderList(warnings)}
      </div>
      <div className="buttons">
        <Link
          className="button is-danger is-inverted"
          to={`/kitbag/kit/${kitbagId}`}
        >
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitLevelWarnings;
