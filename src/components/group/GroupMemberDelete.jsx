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
  const memberName = `${user.firstName} ${user.lastName}`;

  function handleSubmit() {
    deleteGroupMember({ groupId, memberId });
    setModalIsActive(false);
  }

  return (
    <Modal
      title="Please confirm"
      buttonClassName="is-danger"
      buttonText="Delete"
      handleSubmit={handleSubmit}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
    >
      <p className="is-size-6">
        {`Are you sure you want to delete this member, "${memberName}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberDelete);
