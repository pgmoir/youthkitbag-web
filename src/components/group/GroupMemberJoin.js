import React from 'react';
import { connect } from 'react-redux';
import { requestGroupJoin } from '../../actions/GroupActions';

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
            {`Would you like to submit a request to join "${name}"?`}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={async () => {
              requestGroupJoin({ groupId });
              setModalIsActive(false);
            }}
          >
            Submit Request
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberJoin);
