import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { fetchAccount, inviteToAccount } from '../../actions/AccountActions';
import { TextForm } from '../includes/forms';
import ModalWithForm from '../includes/ModalWithForm';
import history from '../../helpers/history';

const mapStateToProps = state => ({
  account: state.account.current,
  newErrors: state.toast.errors
});

const mapDispatchToProps = {
  fetchAccount,
  inviteToAccount
};

const AccountMemberInvite = ({
  account,
  newErrors,
  fetchAccount,
  inviteToAccount,
  match
}) => {
  const accountId = match.params.accountId;
  const invite = { email: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    invite,
    sendInvite
  );

  useEffect(() => {
    if (accountId) {
      fetchAccount(accountId);
    }
  }, [fetchAccount, accountId]);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function sendInvite() {
    if (values.email) {
      inviteToAccount(accountId, values.email);
    }
  }
  function renderTitle() {
    if (!account) {
      return 'Invite to account';
    }
    return `Invite to "${account.name}"`;
  }

  function renderContent() {
    if (!account) {
      return 'Invite option not available.';
    }
    return (
      <React.Fragment>
        <p>
          Enter an email for a person you want to give access to this account
        </p>
        <TextForm
          colFormat="3-9"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
        />
      </React.Fragment>
    );
  }

  function renderActions() {
    return (
      <React.Fragment>
        <Link
          to={`/accounts/${accountId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-success">
          Invite to Join
        </button>
      </React.Fragment>
    );
  }

  return (
    <ModalWithForm
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      handleSubmit={handleSubmit}
      onDismiss={() => history.push(`/accounts/${accountId}`)}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMemberInvite);
