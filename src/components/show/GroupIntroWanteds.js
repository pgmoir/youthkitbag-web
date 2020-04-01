import React from 'react';

const GroupIntroWanteds = ({ wanteds }) => {
  if (!wanteds) return null;

  return (
    <div className="pb-3">
      <h2 className="h4">Wanted / Looking for</h2>
      {wanteds && wanteds.totalItems > 0 && (
        <>
          <p>
            Have an item you don&apos;t need that someone else is looking for.
            There are{' '}
            <span className={`badge badge-pill badge-dark`}>
              {wanteds.totalItems}
            </span>{' '}
            items listed that group members want. Can you help? Some of these
            are shown below.
          </p>
          <div className="row mb-0">
            {wanteds.items.map((m, i) => {
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
                      <h3 className="card-title text-micro ellipsis mb-0 text-secondary">
                        <span
                          className="fas fa-binoculars"
                          title="Wanted item"
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
      {wanteds.totalItems === 0 && (
        <p className="mb-0">
          Right now, no one has listed anything that they want or need. Maybe
          they&apos;re buying elsewhere. Do you need something?
        </p>
      )}
    </div>
  );
};

export default GroupIntroWanteds;
