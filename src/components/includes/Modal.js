import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      className="modal d-block bg-smoke"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      onClick={props.onDismiss}
    >
      <div
        className="modal-dialog"
        role="document"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content bg-mischka">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.onDismiss}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.content}</div>
          <div className="modal-footer">{props.actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
