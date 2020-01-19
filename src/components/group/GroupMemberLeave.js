import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroup, requestGroupLeave } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

const mapDispatchToProps = {
  fetchGroup,
  requestGroupLeave
};

const mapStateToProps = state => ({
  group: state.group.current
});

const GroupMemberLeave = ({ fetchGroup, requestGroupLeave, group, match }) => {
  const groupId = match.params.groupId;

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [fetchGroup, groupId]);

  function renderTitle() {
    if (!group) {
      return 'Request to leave group';
    }
    return `Request to leave "${group.name}"`;
  }

  function renderContent() {
    if (!group) {
      return 'Leave option not available at the moment.';
    }
    return `Do you want to send a request to leave "${group.name}"?`;
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
          onClick={() => requestGroupLeave(groupId)}
        >
          Request to Leave
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupMemberLeave);
