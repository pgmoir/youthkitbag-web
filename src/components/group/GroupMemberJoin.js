import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroup, requestGroupJoin } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../utils/history';

const mapStateToProps = (state) => ({
  group: state.group.current,
});

const mapDispatchToProps = {
  fetchGroup,
  requestGroupJoin,
};

const GroupMemberJoin = ({ group, fetchGroup, requestGroupJoin, match }) => {
  const groupId = match.params.groupId;

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [fetchGroup, groupId]);

  function renderTitle() {
    if (!group) {
      return 'Request to join group';
    }
    return `Request to join "${group.name}"`;
  }

  function renderContent() {
    if (!group) {
      return 'Request option not available.';
    }
    return `Do you want to send a request to join this group?`;
  }

  function renderActions() {
    return (
      <React.Fragment>
        <Link
          to={`/groups/${groupId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => requestGroupJoin(groupId)}
        >
          Request to Join
        </button>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`/groups/${match.params.groupId}`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberJoin);
