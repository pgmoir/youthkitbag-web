import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccount, clearAccount } from '../../actions/AccountActions';
import AccountForm from './AccountForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import AccountsHelp from '../account/AccountsHelp';

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

    return <AccountsHelp />;
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
