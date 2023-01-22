import React from 'react';
import { connect } from 'react-redux';

import useForm from '../hooks/useForm';
import { deleteUser } from '../../actions/UserActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import { Modal } from '../includes/modals/Modal';
import { useNavigate } from 'react-router-dom';

const mapDispatchToProps = {
  deleteUser
};

const DeleteUser = ({
  userId,
  deleteUser,
  modalIsActive,
  setModalIsActive
}) => {
  const navigate = useNavigate();
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
    navigate('/');
  }

  return (
    <Modal
      title="Are you really sure?"
      buttonClassName="is-danger"
      buttonText="Delete"
      handleSubmit={handleSubmit}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
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
