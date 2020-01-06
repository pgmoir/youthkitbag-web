import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchKitbagKit,
  deleteKitbagKit
} from '../../../actions/KitbagKitActions';
import Modal from '../../includes/Modal';
import history from '../../../helpers/history';

class KitDelete extends React.Component {
  componentDidMount() {
    this.props.fetchKitbagKit(
      this.props.match.params.accountId,
      this.props.match.params.id
    );
  }

  renderTitle() {
    if (!this.props.kit) {
      return 'Delete item of kit';
    }
    return `Delete "${this.props.kit.title}"`;
  }

  renderContent() {
    if (!this.props.kit) {
      return 'Are you sure you want to delete this item of kit? You do have the option to just change the active status and retain the history of this item.';
    }
    return `Are you sure you want to delete "${this.props.kit.title}"? You do have the option to just change the active status and retain the history of this item.`;
  }

  renderActions() {
    const accountId = this.props.match.params.accountId;
    const kitId = this.props.match.params.kitId;
    return (
      <React.Fragment>
        <Link
          to={`/kitbag/kit/${accountId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.deleteKitbagKit(accountId, kitId)}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  render() {
    const accountId = this.props.match.params.accountId;
    return (
      <Modal
        title={this.renderTitle()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/kitbag/kit/${accountId}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { kit: state.kitbag.kit[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchKitbagKit, deleteKitbagKit }
)(KitDelete);
