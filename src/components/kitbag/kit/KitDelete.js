import React from 'react';
import { connect } from 'react-redux';
import { deleteKitbagKit } from '../../../actions/KitbagKitActions';

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
  function closeModal() {
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
          <p className="modal-card-title">Please confirm</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6">
            {`Are you sure you want to delete this kitbag item, "${title}"?`}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={async () => {
              deleteKitbagKit({ kitbagId, kitId });
              setModalIsActive(false);
            }}
          >
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

export default connect(null, mapDispatchToProps)(KitDelete);
