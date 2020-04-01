import React from 'react';

const GroupIntroTrades = ({ trades }) => {
  if (!trades) return null;

  return (
    <div className="pb-3">
      <h2 className="h4">Trades / Sales</h2>
      {trades && trades.totalItems > 0 && (
        <>
          <p>
            There are{' '}
            <span className={`badge badge-pill badge-dark`}>
              {trades.totalItems}
            </span>{' '}
            items posted for sale in this group. These are the latest active
            trades. Would you like to buy, or do you have anything to add?
          </p>
          <div className="row mb-0">
            {trades.items.map((m, i) => {
              return (
                <div key={`trade-${i}`} className="col-4">
                  <article className="card card-link card-b1">
                    <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
                      {`£${m.marketPrice}`}
                    </span>
                    <img
                      className="card-img-top"
                      src={m.images[0].imageUrl}
                      alt={m.title}
                      role="presentation"
                    />
                    <div className="card-body">
                      <h3 className="card-title text-micro ellipsis mb-0 text-primary">
                        <span
                          className="fas fa-hands-helping"
                          title="Trade item"
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
      {trades.totalItems === 0 && (
        <p className="mb-0">
          There are no active trades posted in this group. Get things started by
          posting your own sales.
        </p>
      )}
    </div>
  );
};

export default GroupIntroTrades;
