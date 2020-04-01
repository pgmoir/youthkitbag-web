import React from 'react';

const GroupIntroStolens = ({ stolens }) => {
  if (!stolens) return null;

  return (
    <div className="pb-3">
      <h2 className="h4">Stolen / Lost</h2>
      {stolens && stolens.totalItems > 0 && (
        <>
          <p>
            Sad to say there are{' '}
            <span className={`badge badge-pill badge-dark`}>
              {stolens.totalItems}
            </span>{' '}
            items that have been lost or stolen. Are you able to help track
            these down. Here are the latest items listed.
          </p>
          <div className="row mb-0">
            {stolens.items.map((m, i) => {
              return (
                <div key={`trade-${i}`} className="col-4">
                  <article className="card card-link card-b1">
                    <img
                      className="card-img-top"
                      src={m.images[0].imageUrl}
                      alt={m.title}
                      role="presentation"
                    />
                    <div className="card-body">
                      <h3 className="card-title text-micro ellipsis mb-0 text-danger">
                        <span
                          className="fas fa-volume-up"
                          title="Stolen item"
                        ></span>
                        &nbsp;&nbsp;
                        {m.title}
                      </h3>
                      {m.subtitle && (
                        <p className="card-text text-micro ellipsis mt-1">
                          {m.subtitle}
                        </p>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </>
      )}
      {stolens.totalItems === 0 && (
        <p className="mb-0">
          Great to report, that no one has listed anything lost or stolen. But
          if you needed to this should be the first place to list it.
        </p>
      )}
    </div>
  );
};

export default GroupIntroStolens;
