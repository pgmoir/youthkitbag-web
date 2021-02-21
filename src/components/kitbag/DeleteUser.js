import React from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { deleteUser } from '../../actions/UserActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';

const mapDispatchToProps = {
  deleteUser,
};

const DeleteUser = ({
  userId,
  deleteUser,
  modalIsActive,
  setModalIsActive,
}) => {
  function closeModal() {
    setModalIsActive(false);
  }

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

  return (
    <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
      <div
        className="modal-background"
        onClick={closeModal}
        onKeyPress={closeModal}
        role="button"
        tabIndex="0"
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Are you really sure?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6">
            You must enter your current email and password to complete the
            deletion of your user kitbag, and all associated data. Please be
            fully aware that there is no reversal of this action.
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
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={handleSubmit}>
            Delete
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DeleteUser);
