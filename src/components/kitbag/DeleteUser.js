import React from 'react';
import { connect } from 'react-redux';

import useForm from '../hooks/useForm';
import { deleteUser } from '../../actions/UserActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  deleteUser,
};

const DeleteUser = ({
  userId,
  deleteUser,
  modalIsActive,
  setModalIsActive,
}) => {
  const initialValues = { email: '', password: '' };

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    performDeletion,
    validate
  );

  function performDeletion() {
    const formValues = { ...values };
    deleteUser({ userId, formValues });
    setModalIsActive(false);
  }

  function getPrimaryButton() {
    return (
      <button className="button is-danger" onClick={handleSubmit}>
        Delete
      </button>
    );
  }

  return (
    <Modal
      title="Are you really sure?"
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
      primaryButton={getPrimaryButton()}
    >
      <p className="is-size-6">
        You must enter your current email and password to complete the deletion
        of your user kitbag, and all associated data. Please be fully aware that
        there is no reversal of this action.
      </p>
      <TextInput
        label="Email"
        value={values.email}
        field="email"
        handleChange={handleChange}
        error={errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        value={values.password}
        field="password"
        handleChange={handleChange}
        error={errors.password}
      />
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(DeleteUser);
