import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../actions/UserActions';
import ModalWithForm from '../includes/ModalWithForm';
import history from '../../utils/history';
import validate from '../includes/FormEmptyValidationRules';
import Alert from '../includes/Alert';
import TextInputStd from '../includes/controls/TextInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  deleteUser,
};

const DeleteUser = ({ newErrors, deleteUser, match }) => {
  const { userId } = match.params;
  const authenticate = { email: '', password: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    authenticate,
    performDeletUser,
    validate
  );

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function performDeletUser() {
    deleteUser(userId, values);
  }
  function renderTitle() {
    return 'Delete User - Are you really sure?';
  }

  function renderContent() {
    return (
      <>
        <Alert />
        <p>
          You must enter your current email and password to complete the
          deletion of your user kitbag, and all associated data. Please be fully
          aware that there is no reversal of this action.
        </p>
        <TextInputStd
          type="email"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          autoComplete="userName email"
        />
      </>
    );
  }

  function renderActions() {
    return (
      <div className="buttons">
        <Link
          to={`/settings/configuration`}
          className="button is-warning"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button type="submit" className="button is-danger">
          Delete User
        </button>
      </div>
    );
  }

  return (
    <ModalWithForm
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      handleSubmit={handleSubmit}
      onDismiss={() => history.push(`/settings/configuration`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
