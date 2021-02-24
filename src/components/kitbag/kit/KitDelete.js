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
  function getPrimaryButton() {
    return (
      <button
        className="button is-success"
        onClick={async () => {
          deleteKitbagKit({ kitbagId, kitId });
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
        {`Are you sure you want to delete this kitbag item, "${title}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(KitDelete);
