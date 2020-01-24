import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { fetchAccount, inviteToAccount } from '../../actions/AccountActions';
import validate from './AccountMemberInviteFormValidationRules';
import { TextForm } from '../includes/forms';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

const mapDispatchToProps = {
  fetchAccount,
  inviteToAccount
};

const mapStateToProps = state => ({
  account: state.account.current,
  newErrors: state.toast.errors
});

const AccountMemberJoin = ({
  fetchAccount,
  inviteToAccount,
  account,
  newErrors,
  match
}) => {
  const accountId = match.params.accountId;
  const invite = { email: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    invite,
    sendInvite,
    validate
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
      console.log('INVITED', values.email, accountId);
      //inviteToAccount(accountId, values.email);
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
    return `Do you want to send an invite to join this account?`;
  }

  function renderActions() {
    return (
      <React.Fragment>
        <form className="mb-3" onSubmit={handleSubmit}>
          <TextForm
            colFormat="3-9"
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
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
        </form>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`/accounts/${accountId}`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberJoin);
