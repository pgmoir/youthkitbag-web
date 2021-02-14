import React from 'react';
import { connect } from 'react-redux';
import { deleteMarketKit } from '../../../actions/KitbagMarketActions';

const mapDispatchToProps = {
  deleteMarketKit,
};

const MarketItemDelete = ({
  marketId,
  kitbagId,
  title,
  modalIsActive,
  setModalIsActive,
  deleteMarketKit,
}) => {
  function closeModal() {
    setModalIsActive(false);
  }

  // useEffect(() => {
  //   if (kitbagId && marketId) {
  //     fetchMarketKit(kitbagId, marketId);
  //   }
  // }, [kitbagId, marketId, fetchMarketKit]);

  // function renderTitle() {
  //   if (!kit._id) {
  //     return 'Delete item of kit';
  //   }
  //   return `Delete "${kit.title}"`;
  // }

  // function renderContent() {
  //   if (!kit._id) {
  //     return 'Are you sure you want to delete this item of kit? You do have the option to just change the active state and retain the history of this item.';
  //   }
  //   return `Are you sure you want to delete "${kit.title}"? You do have the option to just change the active state and retain the history of this item.`;
  // }

  // function renderActions() {
  //   return (
  //     <>
  //       <Link
  //         to={`/market`}
  //         className="btn btn-outline-secondary"
  //         data-dismiss="modal"
  //       >
  //         Cancel
  //       </Link>
  //       <button
  //         type="button"
  //         className="btn btn-danger"
  //         onClick={() => deleteMarketKit(kitbagId, marketId)}
  //       >
  //         Delete
  //       </button>
  //     </>
  //   );
  // }

  return (
    <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
      <div
        className="modal-background"
        onClick={closeModal}
        onKeyPress={closeModal}
        role="button"
        tabIndex="0"
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Please confirm</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6">
            {`Are you sure you want to delete this market item, "${title}"?`}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={async () => {
              deleteMarketKit(kitbagId, marketId);
              setModalIsActive(false);
            }}
          >
            Delete
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );

  // return (
  //   <Modal
  //     title={renderTitle()}
  //     content={renderContent()}
  //     actions={renderActions()}
  //     onDismiss={() => history.push(`/market`)}
  //   />
  // );
};

export default connect(null, mapDispatchToProps)(MarketItemDelete);
