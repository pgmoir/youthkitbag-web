import React, { useState } from 'react';
import history from '../../../utils/history';

const KitCard = ({ kit, kitbagId }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  function topImage() {
    const { images } = kit;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  function renderBlank() {
    return (
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="/images/default.png" alt="" role="presentation" />
            </figure>
            <div className="has-text-right p-2 is-overlay">
              <span className="tag is-dark is-rounded">0</span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">Loading ...</p>
            <p className="subtitle is-size-6"></p>
          </div>
        </article>
      </div>
    );
  }

  const { _id, title, subtitle } = kit;

  if (!_id) return renderBlank();

  function totalQuantity() {
    const { inbag } = kit;
    if (!inbag) {
      return 0;
    }
    return inbag.reduce(function (x, y) {
      return x + y.quantity;
    }, 0);
  }

  function viewItem(e) {
    history.push(`/kitbag/kit/${kitbagId}/edit/${_id}`);
  }

  function deleteItem(e) {
    console.log('DELETE', kitbagId, _id, title);
    setModalIsActive(true);
    /* <Link to={`/kitbag/kit/${kitbagId}/delete/${_id}`}> */
  }

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <>
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card is-clickable" onClick={(e) => viewItem(e)}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage()} alt={title} role="presentation" />
            </figure>
            <div className="has-text-right p-2 is-overlay">
              <span className="tag is-dark is-rounded">{totalQuantity()}</span>
            </div>
            <div className="has-text-left p-2 is-overlay">
              <span
                className="tag is-danger is-medium is-clickable"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(e);
                }}
              >
                <span
                  className="fas fa-trash-alt"
                  title="Delete kit item"
                ></span>
              </span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">{title}</p>
            {subtitle && <p className="subtitle is-size-6">{subtitle}</p>}
          </div>
        </article>
      </div>
      <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Please confirm</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <p className="is-size-6">
              Are you sure you want to delete the item of kit, "{title}"?
            </p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Delete</button>
            <button className="button is-warning" onClick={closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default KitCard;
