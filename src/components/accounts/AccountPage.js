import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccount } from '../../actions/AccountActions';
import AccountForm from './AccountForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapStateToProps = state => ({
  current: state.account.current
});

const mapDispatchToProps = {
  fetchAccount
};

const AccountPage = ({ current, fetchAccount, match }) => {
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
      console.log('UE-FETCH', accountId);
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

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end">
              {accountId &&
                account.accountAdmin &&
                account.status !== 'blocked' && (
                  <Link
                    to={`/accounts/${accountId}/members`}
                    className="btn btn-primary"
                  >
                    Members
                  </Link>
                )}
              {accountId &&
                account.status !== 'blocked' &&
                !account.accountMember && (
                  <Link
                    to={`/accounts/${accountId}/join`}
                    className={`btn btn-primary ${
                      account.accountMemberState ? 'disabled' : ''
                    } ml-3`}
                    disabled={account.accountMemberState}
                  >
                    Join
                  </Link>
                )}
              {accountId &&
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
