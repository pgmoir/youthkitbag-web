import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/AuthActions';

const mapDispatchToProps = {
  logout
};

const Logout = ({ logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return <h1 className="loading-text">Logging out...</h1>;
};

export default connect(null, mapDispatchToProps)(Logout);
