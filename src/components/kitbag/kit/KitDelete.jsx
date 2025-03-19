import React from 'react';
import { connect } from 'react-redux';
import { deleteKitbagKit } from '../../../actions/KitbagKitActions';
import { Modal } from '../../includes/modals/Modal';

const mapDispatchToProps = {
  deleteKitbagKit,
};

const KitDelete = ({
  kitId,
  kitbagId,
  title,
  modalIsActive,
  setModalIsActive,
  deleteKitbagKit,
}) => {
  function handleSubmit() {
    deleteKitbagKit({ kitbagId, kitId });
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
        {`Are you sure you want to delete this kitbag item, "${title}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(KitDelete);
