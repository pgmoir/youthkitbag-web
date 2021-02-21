import React from 'react';
import { connect } from 'react-redux';

import { deleteFromKitbag } from '../../actions/KitbagActions';

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
  function closeModal() {
    setModalIsActive(false);
  }

  function deleteMember() {
    deleteFromKitbag({ kitbagId, memberId });
    setModalIsActive(false);
  }

  return (
    <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
      <div
        className="modal-background"
        onClick={closeModal}
        onKeyPress={closeModal}
        role="button"
        tabIndex="0"
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Delete from "${kitbagName}"`}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6 mb-3">
            {`Click the Delete option to confirm that you wish to delete "${memberEmail}" from this kitbag`}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={deleteMember}>
            Delete
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberDelete);
