import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const BadgesPage = ({ user }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you will be awarded different badges and
            trophies as you reach certain milestones and achievements.
          </p>
        </div>
      </div>
      {user && user.badges && user.badges.length > 0 && (
        <div className="row">
          <div className="col-12">
            <h5>Awarded Badges and Trophies</h5>
            {user.badges.map((item, index) => (
              <div key={`${item._id}-${index}`}></div>
            ))}
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <Link to="/badges" className="btn btn-primary">
            Search badges
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(BadgesPage);
