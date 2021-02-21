import React from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { requestToJoinKitbag } from '../../actions/KitbagActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';

const mapDispatchToProps = {
  requestToJoinKitbag,
};

const KitbagMemberJoin = ({
  requestToJoinKitbag,
  modalIsActive,
  setModalIsActive,
}) => {
  function closeModal() {
    setModalIsActive(false);
  }

  const initialValues = { email: '' };

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    sendRequest,
    validate
  );

  function sendRequest() {
    const formValues = { ...values };
    requestToJoinKitbag({ formValues });
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
          <p className="modal-card-title">Request to join a kitbag?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6">
            Enter the email of the person who has the kitbag to which you&apos;d
            like to join.
          </p>
          <TextInput
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={handleSubmit}>
            Send Request
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberJoin);
