import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccount, clearAccount } from '../../actions/AccountActions';
import AccountForm from './AccountForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapStateToProps = state => ({
  current: state.account.current,
  profile: state.user.profile
});

const mapDispatchToProps = {
  fetchAccount,
  clearAccount
};

const AccountPage = ({
  current,
  profile,
  fetchAccount,
  clearAccount,
  match
}) => {
  const { accountId } = match.params;
  const [account, setAccount] = useState({
    name: '',
    description: '',
    images: [],
    members: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (accountId) {
      fetchAccount(accountId);
    }
  }, [fetchAccount, accountId]);

  useEffect(() => {
    if (current && current._id) {
      const newAccount = {
        ...current,
        imagesToUpload: 0
      };
      setAccount(newAccount);
    }
  }, [current]);

  function accountIsLoading() {
    return accountId && !account._id;
  }

  function getTitle() {
    if (accountIsLoading()) {
      return 'Loading ...';
    }
    const leftState = account.accountMemberState === 'left' ? ' (left)' : '';
    return account._id ? `${account.name}${leftState}` : 'Create new account';
  }

  function renderNoAccountIntro() {
    if (!profile.accounts) return null;

    if (!profile.accounts || profile.accounts.length > 0) return null;

    return (
      <div className="jumbotron">
        <h1 className="display-4">Why create an account?</h1>
        <p className="lead">
          YouthKitbag serves two key purposes. One being the ability to trade or
          recycle within a safe and accredited group. The other is the ability
          to keep track of youth kit you own, and it also simplifies the trading
          process. <strong>You do this by creating an account</strong>.
        </p>
        <hr className="my-4"></hr>
        <p>
          An account can be shared by multiple users, so it is perfect for
          families. Only admin users can trade items, but members can add and
          edit stored items. Or you can just create it for your own self
          organisation.
        </p>
        <p>
          To learn more we have a short video which explains this feature more.
        </p>
        <Link to="/learn/intro" className="btn btn-primary btn-lg">
          Watch our guide to YouthKitbag
        </Link>
      </div>
    );
  }

  useEffect(() => {
    return function clearUp() {
      clearAccount();
    };
  }, [clearAccount]);

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          {renderNoAccountIntro()}
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end">
              {accountId &&
                account.accountAdmin &&
                account.status !== 'blocked' && (
                  <Link
                    to={`/accounts/${accountId}/invite`}
                    className="btn btn-primary"
                  >
                    Invite
                  </Link>
                )}
              {accountId &&
                !account.accountAdmin &&
                account.status !== 'blocked' &&
                account.accountMember && (
                  <Link
                    to={`/accounts/${accountId}/leave`}
                    className="btn btn-primary ml-3"
                  >
                    Leave
                  </Link>
                )}
            </div>
          </div>
          <AccountForm account={account} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
