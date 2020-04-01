import React from 'react';

const GroupIntroRecycles = ({ recycles }) => {
  if (!recycles) return null;

  return (
    <div className="pb-3">
      <h2 className="h4">Recycling / Free</h2>
      {recycles && recycles.totalItems > 0 && (
        <>
          <p>
            Looking for a good home. There are{' '}
            <span className={`badge badge-pill badge-dark`}>
              {recycles.totalItems}
            </span>{' '}
            items being given away for nothing, maybe because the owner has
            outgrown them, bought new ones or just doesn&apos;t want to trash
            old kit. These are the latest active FREE items!
          </p>
          <div className="row mb-0">
            {recycles.items.map((m, i) => {
              return (
                <div key={`trade-${i}`} className="col-4">
                  <article className="card card-link card-b1">
                    <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
                      Free
                    </span>
                    <img
                      className="card-img-top"
                      src={m.images[0].imageUrl}
                      alt={m.title}
                      role="presentation"
                    />
                    <div className="card-body">
                      <h3 className="card-title text-micro ellipsis mb-0 text-success">
                        <span
                          className="fas fa-hands-helping"
                          title="Recycle item"
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
      {recycles.totalItems === 0 && (
        <p className="mb-0">
          Sorry, but at the moment, no one is giving anything away. Maybe you
          have some kit that could be recycled or passed on to a younger member
          of your club or team.
        </p>
      )}
    </div>
  );
};

export default GroupIntroRecycles;
