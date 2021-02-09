import { connect, useSelector } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import { fetchKitbagLists } from '../../actions/KitbagKitActions';

const mapDispatchToProps = {
  getUser,
  fetchKitbagLists,
};

const User = ({ getUser, fetchKitbagLists }) => {
  const userId = useSelector((state) => state.user._id);
  const kitbags = useSelector((state) => state.user.kitbags);

  const kitbagId =
    kitbags &&
    kitbags.length > 0 &&
    kitbags.filter((k) => k.preferred).length > 0
      ? kitbags.find((a) => a.preferred)._id
      : undefined;

  if (!userId) {
    getUser();
  }

  if (kitbagId) {
    fetchKitbagLists(kitbagId);
  }

  return null;
};

export default connect(null, mapDispatchToProps)(User);
