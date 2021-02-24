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
  function getPrimaryButton() {
    return (
      <button
        className="button is-success"
        onClick={async () => {
          deleteMarketKit(kitbagId, marketId);
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
        {`Are you sure you want to delete this market item, "${title}"?`}
      </p>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(MarketItemDelete);
