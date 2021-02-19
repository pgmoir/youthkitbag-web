import React from 'react';
import { connect } from 'react-redux';
import { editGroupState } from '../../actions/GroupActions';
import SelectInput from '../includes/controls/SelectInput';
import useForm from '../hooks/useForm';
import validate from '../includes/FormEmptyValidationRules';
import { GroupStates } from '../../enums/groupStates.enum';

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
  function closeModal() {
    setModalIsActive(false);
  }

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
          <p className="modal-card-title">Select group state</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
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
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>
            Save
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(GroupState);
