import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editGroupMember } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../utils/history';

const mapDispatchToProps = {
  editGroupMember,
};

const GroupMemberState = ({
  groupId,
  memberId,
  user,
  editGroupMember,
  modalIsActive,
  setModalIsActive,
}) => {
  function closeModal() {
    setModalIsActive(false);
  }

  function memberName() {
    return `${user.firstName} ${user.lastName}`;
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
          <p className="modal-card-title">Select member state</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6">
            {`Are you sure you want to change the membership status for, "${memberName()}"?`}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={async () => {
              editGroupMember({ groupId, memberId });
              setModalIsActive(false);
            }}
          >
            Save
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberState);
