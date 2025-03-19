import React from 'react';
import { connect } from 'react-redux';

import { editGroupState } from '../../actions/GroupActions';
import SelectInput from '../includes/controls/SelectInput';
import useForm from '../hooks/useForm';
import validate from '../includes/FormEmptyValidationRules';
import { GroupStates } from '../../enums/groupStates.enum';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  editGroupState,
};

const GroupState = ({
  groupId,
  groupState,
  groupName,
  editGroupState,
  modalIsActive,
  setModalIsActive,
}) => {
  const initialValues = { state: groupState };

  const stateItems = [
    '',
    GroupStates.ACTIVE,
    GroupStates.REQUESTED,
    GroupStates.BLOCKED,
    GroupStates.DELETED,
  ];

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    updateGroup,
    validate
  );

  function updateGroup() {
    const formValues = { ...values };
    editGroupState({ groupId, formValues });
    setModalIsActive(false);
  }

  return (
    <Modal
      title="Select group state"
      handleSubmit={handleSubmit}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
    >
      <p className="is-size-6 mb-3">
        {`Select the new group status for, "${groupName}"`}
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

export default connect(null, mapDispatchToProps)(GroupState);
