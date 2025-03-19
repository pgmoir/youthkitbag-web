import React from 'react';
import { MarketTypes } from '../../enums/marketTypes.enum';

const GroupIntroMarkets = ({ type, markets }) => {
  if (!markets) return null;

  let marketElements = {};

  if (type === MarketTypes.TRADE) {
    marketElements = {
      title: 'Trades / Sales',
      color: 'primary',
      icon: 'fas fa-hands-helping',
      intro:
        'There are $ items posted for sale in this group. These are the latest active trades. Would you like to buy, or do you have anything to add?',
      footer:
        'There are no active trades posted in this group. Get things started by posting your own sales.',
    };
  } else if (type === MarketTypes.RECYCLE) {
    marketElements = {
      title: 'Recycling / Free',
      color: 'success',
      icon: 'fas fa-hands-helping',
      intro:
        "Looking for a good home. There are $ items being given away for nothing, maybe because the owner has outgrown them, bought new ones or just doesn't want to trash old kit. These are the latest active FREE items!",
      footer:
        'Sorry, but at the moment, no one is giving anything away. Maybe you have some kit that could be recycled or passed on to a younger member of your club or team.',
    };
  } else if (type === 'foundloststolen') {
    marketElements = {
      title: 'Found / Lost / Stolen',
      color: 'danger',
      icon: 'fas fa-volume-up',
      intro:
        'There are $ items that have been found, lost or stolen. Are you able to help reunite these items with their owner. Here are the latest items listed.',
      footer:
        'Great to report, that no one has listed anything found, lost or stolen. But if you needed to this should be the first place to list it.',
    };
  } else if (type === MarketTypes.WANTED) {
    marketElements = {
      title: 'Wanted / Looking for',
      color: 'secondary',
      icon: 'fas fa-binoculars',
      intro:
        "Have an item you don't need that someone else is looking for.  There are $ items listed that group members want. Can you help? Some of these are shown below.",
      footer:
        "Right now, no one has listed anything that they want or need. Maybe they're buying elsewhere. Do you need something?",
    };
  }

  const { title, color, icon, intro, footer } = marketElements;

  function introWithPill() {
    const introParts = intro.split('$');
    return (
      <p>
        {introParts[0]}{' '}
        <span className={`badge badge-pill badge-${color}`}>
          {markets.totalItems}
        </span>{' '}
        {introParts[1]}
      </p>
    );
  }

  function itemPill(item) {
    if ([MarketTypes.TRADE, MarketTypes.WANTED].includes(item.marketType)) {
      if (item.marketPrice > 0) {
        return `£${item.marketPrice.toFixed(2)}`;
      } else {
        return 'free';
      }
    } else {
      return item.marketType;
    }
  }

  return (
    <div className="pb-3">
      <h2 className={`h4 text-${color}`}>
        <span className={`${icon} has-text-centered pr-2`} title={title}></span>
        {title}
      </h2>
      {markets && markets.totalItems > 0 && (
        <>
          {introWithPill()}
          <div className="row mb-0">
            {markets.items.map((m, i) => {
              return (
                <div key={`trade-${i}`} className="col-4">
                  <article className="card card-link card-b1">
                    <span
                      className={`badge badge-pill badge-${color} badge-fullsize badge-top-right`}
                    >
                      {itemPill(m)}
                    </span>
                    <img
                      className="card-img-top"
                      src={m.images[0].imageUrl}
                      alt={m.title}
                      role="presentation"
                    />
                    <div className="card-body">
                      <h3
                        className={`card-title text-micro ellipsis mb-0 text-${color}`}
                      >
                        <span className={icon} title={title}></span>
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
      {markets.totalItems === 0 && <p>{footer}</p>}
    </div>
  );
};

export default GroupIntroMarkets;
