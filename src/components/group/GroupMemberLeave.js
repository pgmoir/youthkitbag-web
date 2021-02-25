import React from 'react';
import { connect } from 'react-redux';

import { requestGroupLeave } from '../../actions/GroupActions';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  requestGroupLeave,
};

const GroupMemberLeave = ({
  groupId,
  name,
  requestGroupLeave,
  modalIsActive,
  setModalIsActive,
}) => {
  function handleSubmit() {
    requestGroupLeave({ groupId });
    setModalIsActive(false);
  }

  return (
    <Modal
      title="Please confirm"
      buttonText="Leave"
      handleSubmit={handleSubmit}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
    >
      <p className="is-size-6">{`Would you like to leave "${name}"?`}</p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberLeave);
