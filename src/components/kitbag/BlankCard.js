import React from 'react';

const BlankCard = () => {
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
};

export default BlankCard;
