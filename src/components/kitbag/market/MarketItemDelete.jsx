import React from 'react';
import { connect } from 'react-redux';

import { deleteMarketKit } from '../../../actions/KitbagMarketActions';
import { Modal } from '../../includes/modals/Modal';

const mapDispatchToProps = {
  deleteMarketKit,
};

const MarketItemDelete = ({
  marketId,
  kitbagId,
  title,
  modalIsActive,
  setModalIsActive,
  deleteMarketKit,
}) => {
  function handleSubmit() {
    deleteMarketKit(kitbagId, marketId);
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
        {`Are you sure you want to delete this market item, "${title}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(MarketItemDelete);
