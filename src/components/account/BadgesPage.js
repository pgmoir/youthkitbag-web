import React from 'react';
import { Link } from 'react-router-dom';

const BadgesPage = () => {
  return (
    <React.Fragment>
      <div className="row">
        <p>Displays details of badges attained, and next target badges</p>
      </div>
      <div className="row">
        <Link to="/badges" className="btn btn-primary">
          Search badges
        </Link>
      </div>
    </React.Fragment>
  );
};

export default BadgesPage;
