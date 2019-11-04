import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, editGroupStatus } from './../../actions/GroupActions';
import Modal from './../includes/Modal';
import history from './../../helpers/history';

class GroupStatus extends React.Component {
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  renderTitle() {
    if (!this.props.kit) {
      return 'Update status of group';
    }
    return `Update status of "${this.props.group.name}"`;
  }

  renderContent() {
    if (!this.props.group) {
      return 'Are you sure you want to change the status of this group. Any change may impact existing members or market items.';
    }
    return `How do you want to change the status of "${this.props.group.name}"? You can either approve or block this group. Any change may impact existing members or market items.`;
  }

  renderActions() {
    const { groupId } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.editGroupStatus(groupId, 'blocked')}
        >
          Block
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.props.editGroupStatus(groupId, 'approved')}
        >
          Approve
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
        onDismiss={() => history.push('/groups')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { group: state.group[ownProps.match.params.groupId] };
};

export default connect(
  mapStateToProps,
  { fetchGroup, editGroupStatus }
)(GroupStatus);
