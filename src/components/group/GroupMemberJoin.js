import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroup, requestGroupJoin } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

class GroupMemberJoin extends React.Component {
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  renderTitle() {
    if (!this.props.group) {
      return 'Request to join group';
    }
    return `Request to join "${this.props.group.name}"`;
  }

  renderContent() {
    if (!this.props.group) {
      return 'Request option not available.';
    }
    return `Do you want to send a request to join this group?`;
  }

  renderActions() {
    const { groupId } = this.props.match.params;
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
          onClick={() => this.props.requestGroupJoin(groupId)}
        >
          Request to Join
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title={this.renderTitle()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() =>
          history.push(`/groups/${this.props.match.params.groupId}`)
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return { group: state.group.current };
};

export default connect(
  mapStateToProps,
  { fetchGroup, requestGroupJoin }
)(GroupMemberJoin);
