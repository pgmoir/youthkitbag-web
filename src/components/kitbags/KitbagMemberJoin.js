import React from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { requestToJoinKitbag } from '../../actions/KitbagActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  requestToJoinKitbag,
};

const KitbagMemberJoin = ({
  requestToJoinKitbag,
  modalIsActive,
  setModalIsActive,
}) => {
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

  function getPrimaryButton() {
    return (
      <button className="button is-primary" onClick={handleSubmit}>
        Send Request
      </button>
    );
  }

  return (
    <Modal
      title="Request to join a kitbag?"
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
      primaryButton={getPrimaryButton()}
    >
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
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberJoin);
