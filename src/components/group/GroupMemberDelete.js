import React from 'react';
import { connect } from 'react-redux';

import { deleteGroupMember } from '../../actions/GroupActions';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  deleteGroupMember,
};

const GroupMemberDelete = ({
  groupId,
  memberId,
  user,
  deleteGroupMember,
  modalIsActive,
  setModalIsActive,
}) => {
  function memberName() {
    return `${user.firstName} ${user.lastName}`;
  }

  function getPrimaryButton() {
    return (
      <button
        className="button is-success"
        onClick={async () => {
          deleteGroupMember({ groupId, memberId });
          setModalIsActive(false);
        }}
      >
        Delete
      </button>
    );
  }

  return (
    <Modal
      title="Please confirm"
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
      primaryButton={getPrimaryButton()}
    >
      <p className="is-size-6">
        {`Are you sure you want to delete this member, "${memberName()}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberDelete);
