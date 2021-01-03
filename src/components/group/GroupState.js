import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGroup, editGroupState } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../utils/history';

const mapStateToProps = (state, ownProps) => ({
  group: state.group[ownProps.match.params.groupId],
});

const mapDispatchToProps = {
  fetchGroup,
  editGroupState,
};

const GroupState = ({ group, fetchGroup, editGroupState, match }) => {
  const groupId = match.params.groupId;

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [fetchGroup, groupId]);

  function renderTitle() {
    if (!group) {
      return 'Update state of group';
    }
    return `Update state of "${group.name}"`;
  }

  function renderContent() {
    if (!group) {
      return 'Are you sure you want to change the state of this group. Any change may impact existing members or market items.';
    }
    return `How do you want to change the state of "${group.name}"? You can either approve or block this group. Any change may impact existing members or market items.`;
  }

  function renderActions() {
    const { groupId } = match.params;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => editGroupState(groupId, 'blocked')}
        >
          Block
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => editGroupState(groupId, 'approved')}
        >
          Approve
        </button>
      </React.Fragment>
    );
  }

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/groups')}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupState);
