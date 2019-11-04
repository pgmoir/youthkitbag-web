import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editGroupMemberState } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

class GroupMemberState extends React.Component {
  renderTitle() {
    return 'Change status of member';
  }

  renderContent() {
    return 'Are you sure you want to change the status of this member?';
  }

  renderActions() {
    const { groupId, memberId, state } = this.props.match.params;
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
          onClick={() =>
            this.props.editGroupMemberState(groupId, memberId, state)
          }
        >
          {this.capitalizeFirstLetter(state)}
        </button>
      </React.Fragment>
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { groupId } = this.props.match.params;
    return (
      <Modal
        title={this.renderTitle()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/groups/${groupId}/members`)}
      />
    );
  }
}

export default connect(
  null,
  { editGroupMemberState }
)(GroupMemberState);
