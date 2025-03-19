import React from 'react';
import classNames from 'classnames';

const Modal = ({
  title,
  children,
  buttonClassName = 'is-success',
  buttonText = 'Save',
  handleSubmit,
  modalIsActive,
  setModalIsActive
}) => {
  const modalClasses = classNames('modal', {
    'is-active': modalIsActive
  });

  const primaryButtonClasses = classNames('button', buttonClassName);

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <div className={modalClasses}>
      <div
        className="modal-background"
        onClick={closeModal}
        role="button"
        tabIndex="0"
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button className={primaryButtonClasses} onClick={handleSubmit}>
            {buttonText}
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export { Modal };
