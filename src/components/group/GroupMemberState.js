import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editGroupMember } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../utils/history';

const mapDispatchToProps = {
  editGroupMember,
};

const GroupMemberState = ({ editGroupMember, match }) => {
  const { groupId } = match.params;

  function renderTitle() {
    return 'Change state of member';
  }

  function renderContent() {
    return 'Are you sure you want to change the state of this member?';
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderActions() {
    const { groupId, memberId, state } = match.params;
    return (
      <>
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
          onClick={() =>
            editGroupMember({ groupId, memberId, formValues: { state } })
          }
        >
          {capitalizeFirstLetter(state)}
        </button>
      </>
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

export default connect(null, mapDispatchToProps)(GroupMemberState);
