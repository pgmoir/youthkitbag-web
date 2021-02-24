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
  function getPrimaryButton() {
    return (
      <button
        className="button is-success"
        onClick={async () => {
          requestGroupLeave({ groupId });
          setModalIsActive(false);
        }}
      >
        Leave
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
      <p className="is-size-6">{`Would you like to leave "${name}"?`}</p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberLeave);
