import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const MarketAnnouncement = ({ group }) => {
  if (!group) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-info mb-0" role="alert">
        <h2 className="alert-heading">Market watches</h2>
        <hr />
        <p>You have received responses to your trade offers.</p>
        <Link className="btn btn-info" to="/market">
          Check the market
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketAnnouncement);
