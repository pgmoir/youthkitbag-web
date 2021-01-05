import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchKitbagKit,
  deleteKitbagKit,
} from '../../../actions/KitbagKitActions';
import Modal from '../../includes/Modal';
import history from '../../../utils/history';

const mapStateToProps = (state) => ({
  item: state.kitbag.kit.current,
});

const mapDispatchToProps = {
  fetchKitbagKit,
  deleteKitbagKit,
};

const KitDelete = ({ item, fetchKitbagKit, deleteKitbagKit, match }) => {
  const { kitbagId, kitId } = match.params;
  const [kit, setKit] = useState({});

  useEffect(() => {
    if (item) {
      setKit(item);
    }
  }, [item, setKit]);

  useEffect(() => {
    if (kitbagId && kitId) {
      fetchKitbagKit(kitbagId, kitId);
    }
  }, [kitbagId, kitId, fetchKitbagKit]);

  function renderTitle() {
    if (!kit._id) {
      return 'Delete item of kit';
    }
    return `Delete "${kit.title}"`;
  }

  function renderContent() {
    if (!kit._id) {
      return 'Are you sure you want to delete this item of kit? You do have the option to just change the active state and retain the history of this item.';
    }
    return `Are you sure you want to delete "${kit.title}"? You do have the option to just change the active state and retain the history of this item.`;
  }

  function renderActions() {
    return (
      <>
        <Link
          to={`/kitbag/kit/${kitbagId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteKitbagKit(kitbagId, kitId)}
        >
          Delete
        </button>
      </>
    );
  }

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`/kitbag/kit/${kitbagId}`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitDelete);
