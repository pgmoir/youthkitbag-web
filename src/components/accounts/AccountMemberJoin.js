import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { requestToJoinAccount } from '../../actions/AccountActions';
import { TextForm } from '../includes/forms';
import ModalWithForm from '../includes/ModalWithForm';
import history from '../../utils/history';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  requestToJoinAccount,
};

const AccountMemberJoin = ({ newErrors, requestToJoinAccount }) => {
  const request = { email: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    request,
    sendRequest,
    validate
  );

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function sendRequest() {
    if (values.email) {
      requestToJoinAccount(values.email);
    }
  }
  function renderTitle() {
    return 'Request to join account';
  }

  function renderContent() {
    return (
      <React.Fragment>
        <p>
          Enter the email of the person who has the account to which you&apos;d
          like to join.
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
          to={`/`}
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
      onDismiss={() => history.push(`/`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberJoin);
