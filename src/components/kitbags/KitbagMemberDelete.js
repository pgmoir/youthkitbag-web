import React from 'react';
import { connect } from 'react-redux';

import { deleteFromKitbag } from '../../actions/KitbagActions';
import { Modal } from '../includes/modals/Modal';

const mapDispatchToProps = {
  deleteFromKitbag,
};

const KitbagMemberDelete = ({
  kitbagId,
  kitbagName,
  memberId,
  memberEmail,
  modalIsActive,
  setModalIsActive,
  deleteFromKitbag,
}) => {
  function handleSubmit() {
    deleteFromKitbag({ kitbagId, memberId });
    setModalIsActive(false);
  }

  return (
    <Modal
      title={`Delete from "${kitbagName}"`}
      buttonClassName="is-danger"
      buttonText="Delete"
      handleSubmit={handleSubmit}
      modalIsActive={modalIsActive}
      setModalIsActive={setModalIsActive}
    >
      <p className="is-size-6 mb-3">
        {`Click the Delete option to confirm that you wish to delete "${memberEmail}" from this kitbag`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberDelete);
