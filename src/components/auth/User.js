import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import { fetchKitbagLists } from '../../actions/KitbagKitActions';

const mapStateToProps = state => ({
  accounts: state.user.profile.accounts
});

const mapDispatchToProps = {
  getUser,
  fetchKitbagLists
};

const User = ({ accounts, getUser, fetchKitbagLists }) => {
  const accountId =
    accounts && accounts.length > 0
      ? accounts.find(a => a.preferred)._id
      : undefined;

  useEffect(() => {
    getUser();
    if (accountId) {
      fetchKitbagLists(accountId);
    }
  }, [getUser, fetchKitbagLists, accountId]);

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
