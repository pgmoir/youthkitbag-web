import React from 'react';
import { ImagesForm } from '../includes/forms';
import { connect } from 'react-redux';
import { ImagesDisplay } from '../includes/forms/ImagesDisplay';

const mapStateToProps = state => ({
  userPackage: state.user.package,
  newErrors: state.toast.errors
});

const GroupDisplay = ({ group }) => {
  if (!group._id) return null;

  return (
    <div className="row">
      <ImagesDisplay images={group.images} />
      <div className="col-12 col-lg-6 order-2 order-lg-1 pr-3" role="main">
        <h2 className="h5">Description</h2>
        <p>{group.description}</p>
        <h2 className="h5">Website</h2>
        <p>
          <a href={group.website} target="_blank" rel="noopener noreferrer">
            {group.website}
          </a>
        </p>
        <h2 className="h5">Activities</h2>
        <ul>
          {group.activitys.map((m, i) => {
            return <li key={i}>{m}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(GroupDisplay);
