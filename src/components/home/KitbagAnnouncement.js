import React from 'react';
import { Link } from 'react-router-dom';

/* 
  For users that have neither set up an kitbag, or do not belong to an kitbag, then 
  we recommend setting up or joining one.
*/
const KitbagAnnouncement = ({ kitbagId, loading }) => {
  if (kitbagId) return null;

  if (loading) {
    return (
      <div className="card border-0">
        <div className="alert alert-success mb-0" role="alert">
          <h2 className="alert-heading">Loading ...</h2>
          <hr />
          <p className="card-text">
            Identifying if you currently have any kitbags
          </p>
          <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
          <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0">
      <div className="alert alert-success mb-0" role="alert">
        <h2 className="alert-heading">Get started</h2>
        <hr />
        <p>
          To make the most of YouthKitbag you will need to create a kitbag to
          keep track of all the kit you have and want to trade.
        </p>
        <p>
          You can either set one up for just yourself, or for your family, or
          there may be one you&apos;d like to join.
        </p>
        <Link className="btn btn-success" to="/kitbags/new">
          Create a kitbag
        </Link>
        <span className="ml-3">or</span>
        <Link className="btn btn-link" to="/kitbags/join">
          Join a kitbag
        </Link>
      </div>
    </div>
  );
};

export default KitbagAnnouncement;
