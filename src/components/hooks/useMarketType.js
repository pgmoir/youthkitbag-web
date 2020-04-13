import React from 'react';

const useMarketType = (marketType, marketPrice, threads, isOwned) => {
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

  const color =
    isFound || isLost || isStolen
      ? 'danger'
      : isWanted || isWantRecycle
      ? 'secondary'
      : isRecycle
      ? 'success'
      : 'primary';

  const pillText =
    isTrade || isWanted
      ? `£${marketPrice.toFixed(2)}`
      : isRecycle || isWantRecycle
      ? 'free'
      : marketType;

  const pill =
    !threads || threads.length === 0 ? (
      <>{pillText}</>
    ) : (
      <>
        {pillText} / <span className="fas fa-comments"></span>{' '}
        {isOwned
          ? `${threads.filter((t) => t.responseState === 'open').length}`
          : ''}
      </>
    );
  return {
    icon,
    iconTitle,
    color,
    pill,
  };
};

export default useMarketType;
