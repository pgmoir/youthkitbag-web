import React from 'react';
import ReactDOM from 'react-dom';

const ModalWithForm = ({
  title,
  content,
  actions,
  handleSubmit,
  onDismiss
}) => {
  return ReactDOM.createPortal(
    <div
      className="modal d-block bg-smoke"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      onClick={onDismiss}
    >
      <div
        className="modal-dialog"
        role="document"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content bg-mischka">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onDismiss}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">{actions}</div>
          </form>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default ModalWithForm;
