import React from 'react';
import { connect } from 'react-redux';

import { requestGroupJoin } from '../../actions/GroupActions';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  requestGroupJoin,
};

const GroupMemberJoin = ({
  groupId,
  name,
  requestGroupJoin,
  modalIsActive,
  setModalIsActive,
}) => {
  function getPrimaryButton() {
    return (
      <button
        className="button is-success"
        onClick={async () => {
          requestGroupJoin({ groupId });
          setModalIsActive(false);
        }}
      >
        Submit Request
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
        {`Would you like to submit a request to join "${name}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberJoin);
