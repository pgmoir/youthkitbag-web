import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteGroupMember } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

const mapDispatchToProps = {
  deleteGroupMember
};

const GroupMemberDelete = ({ deleteGroupMember, match }) => {
  const { groupId } = match.params;

  function renderTitle() {
    return 'Delete member';
  }

  function renderContent() {
    return 'Are you sure you want to delete this member?';
  }

  function renderActions() {
    const { groupId, memberId } = match.params;
    return (
      <React.Fragment>
        <Link
          to={`/groups/${groupId}/members`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteGroupMember(groupId, memberId)}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`/groups/${groupId}/members`)}
    />
  );
};

export default connect(null, mapDispatchToProps)(GroupMemberDelete);
