import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';

const mapDispatchToProps = {
  getUser
};

const User = ({ getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return null;
};

export default connect(
  null,
  mapDispatchToProps
)(User);
