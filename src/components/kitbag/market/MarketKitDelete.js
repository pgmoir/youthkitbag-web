import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchMarketKit,
  deleteMarketKit,
} from '../../../actions/KitbagMarketActions';
import Modal from '../../includes/Modal';
import history from '../../../utils/history';

const mapStateToProps = (state) => ({
  item: state.kitbag.market.current,
});

const mapDispatchToProps = {
  fetchMarketKit,
  deleteMarketKit,
};

const KitDelete = ({ item, fetchMarketKit, deleteMarketKit, match }) => {
  const { kitbagId, marketId } = match.params;
  const [kit, setKit] = useState({});

  useEffect(() => {
    if (item) {
      setKit(item);
    }
  }, [item, setKit]);

  useEffect(() => {
    if (kitbagId && marketId) {
      fetchMarketKit(kitbagId, marketId);
    }
  }, [kitbagId, marketId, fetchMarketKit]);

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
          to={`/market`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteMarketKit(kitbagId, marketId)}
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
      onDismiss={() => history.push(`/market`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitDelete);
