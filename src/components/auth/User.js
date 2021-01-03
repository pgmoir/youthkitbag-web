import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import { fetchKitbagLists } from '../../actions/KitbagKitActions';

const mapStateToProps = (state) => ({
  kitbags: state.user.kitbags,
});

const mapDispatchToProps = {
  getUser,
  fetchKitbagLists,
};

const User = ({ kitbags, getUser, fetchKitbagLists }) => {
  const kitbagId =
    kitbags && kitbags.length > 0
      ? kitbags.find((a) => a.preferred)._id
      : undefined;

  useEffect(() => {
    getUser();
    if (kitbagId) {
      fetchKitbagLists(kitbagId);
    }
  }, [getUser, fetchKitbagLists, kitbagId]);

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
