import React from 'react';
import { connect } from 'react-redux';

import { editGroupMember } from '../../actions/GroupActions';
import { MemberStates } from '../../enums/memberStates.enum';
import SelectInput from '../includes/controls/SelectInput';
import useForm from '../hooks/useForm';
import validate from '../includes/FormEmptyValidationRules';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  editGroupMember,
};

const GroupMemberState = ({
  groupId,
  memberId,
  memberState,
  user,
  editGroupMember,
  modalIsActive,
  setModalIsActive,
}) => {
  const initialValues = { state: memberState };

  const stateItems = [
    '',
    MemberStates.APPROVED,
    MemberStates.INVITED,
    MemberStates.REQUESTED,
    MemberStates.REJECTED,
    MemberStates.SUSPENDED,
    MemberStates.LEFT,
  ];

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    updateMember,
    validate
  );

  function memberName() {
    return `${user.firstName} ${user.lastName}`;
  }

  function updateMember() {
    const formValues = { ...values };
    editGroupMember({ groupId, memberId, formValues });
    setModalIsActive(false);
  }

  function getPrimaryButton() {
    return (
      <button className="button is-success" onClick={handleSubmit}>
        Save
      </button>
    );
  }

  return (
    <Modal
      title="Select member state"
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
      primaryButton={getPrimaryButton()}
    >
      <p className="is-size-6 mb-3">
        {`Select the new membership status for, "${memberName()}"`}
      </p>
      <SelectInput
        value={values.state}
        field="state"
        handleChange={handleChange}
        error={errors.state}
        items={stateItems}
      />
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberState);
