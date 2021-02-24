import React from 'react';
import { connect } from 'react-redux';

import useForm from '../hooks/useForm';
import { inviteToKitbag } from '../../actions/KitbagActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import SelectInput from '../includes/controls/SelectInput';
import { MemberRoles } from '../../enums/memberRoles.enum';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  inviteToKitbag,
};

const KitbagMemberInvite = ({
  kitbagId,
  kitbagName,
  inviteToKitbag,
  modalIsActive,
  setModalIsActive,
}) => {
  const initialValues = { email: '', role: '' };

  const roleItems = ['', MemberRoles.ADMIN, MemberRoles.MEMBER];

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    sendInvite,
    validate
  );

  function sendInvite() {
    const formValues = { ...values };
    inviteToKitbag({ kitbagId, formValues });
    setModalIsActive(false);
  }

  function getPrimaryButton() {
    return (
      <button className="button is-success" onClick={handleSubmit}>
        Invite
      </button>
    );
  }

  return (
    <Modal
      title={`Invite to ${kitbagName}`}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
      primaryButton={getPrimaryButton()}
    >
      <p className="is-size-6 mb-3">
        Enter the email and role for the person you want to invite to this
        kitbag
      </p>
      <TextInput
        label="Email"
        value={values.email}
        field="email"
        handleChange={handleChange}
        error={errors.email}
      />
      <SelectInput
        label="Role"
        value={values.role}
        field="role"
        handleChange={handleChange}
        error={errors.role}
        items={roleItems}
      />
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberInvite);
