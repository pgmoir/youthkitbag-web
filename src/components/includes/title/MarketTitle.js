import React from 'react';

const MarketTitle = ({ market }) => {
  const { title, subtitle, marketType, marketPrice } = market;

  const isTrade = marketType === 'trade' && marketPrice > 0;
  const isRecycle = marketType === 'trade' && marketPrice === 0;
  const isWanted = marketType === 'wanted' && marketPrice > 0;
  const isWantRecycle = marketType === 'wanted' && marketPrice === 0;
  const isFound = marketType === 'found';
  const isLost = marketType === 'lost';
  const isStolen = marketType === 'stolen';

  const icon =
    isFound || isLost || isStolen
      ? 'fas fa-volume-up'
      : isWanted || isWantRecycle
      ? 'fas fa-binoculars'
      : 'fas fa-hands-helping';

  const iconTitle = `${marketType} item`;

  const textColor =
    isFound || isLost || isStolen
      ? 'danger'
      : isWanted || isWantRecycle
      ? 'secondary'
      : isRecycle
      ? 'success'
      : 'primary';

  const pill =
    isTrade || isWanted
      ? `£${marketPrice.toFixed(2)}`
      : isRecycle || isWantRecycle
      ? 'free'
      : marketType;

  function render() {
    if (title === '') {
      return <div className="container pb-3"></div>;
    }

    return (
      <section
        id="title"
        className="container-fluid px-0"
        role="banner"
        aria-label="breadcrumb navigation and page title"
      >
        <div className="container d-flex border-bottom-1">
          <div className={`p-3 align-self-center text-${textColor} h1`}>
            <span className={`${icon} text-center`} title={iconTitle}></span>
          </div>
          <div className="w-100">
            <div className="py-3">
              <h1 className={`m-0 text-${textColor}`}>{title}</h1>
            </div>
            {subtitle && (
              <div className="pb-3">
                <h2 className="m-0">{subtitle}</h2>
              </div>
            )}
          </div>
          <div className="d-flex flex-column">
            <div className="p-3 h1">
              <span className={`badge badge-pill badge-${textColor}`}>
                {pill}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <React.Fragment>{render()}</React.Fragment>;
};

export default MarketTitle;
