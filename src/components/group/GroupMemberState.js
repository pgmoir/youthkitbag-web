import React from 'react';
import { connect } from 'react-redux';
import { editGroupMember } from '../../actions/GroupActions';
import { MemberStates } from '../../enums/memberStates.enum';
import SelectInput from '../includes/controls/SelectInput';
import useForm from '../hooks/useForm';
import validate from '../includes/FormEmptyValidationRules';

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
  function closeModal() {
    setModalIsActive(false);
  }

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
          <p className="modal-card-title">Select member state</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
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

export default connect(null, mapDispatchToProps)(GroupMemberState);
