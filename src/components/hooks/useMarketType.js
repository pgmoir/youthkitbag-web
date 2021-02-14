import React from 'react';
import { MarketTypes } from '../../enums/marketTypes.enum';

const useMarketType = (marketType, marketPrice, threads, isOwned) => {
  const isTrade = marketType === MarketTypes.TRADE && marketPrice > 0;
  const isRecycle = marketType === MarketTypes.TRADE && marketPrice === 0;
  const isWanted = marketType === MarketTypes.WANTED && marketPrice > 0;
  const isWantRecycle = marketType === MarketTypes.WANTED && marketPrice === 0;
  const isFound = marketType === MarketTypes.FOUND;
  const isLost = marketType === MarketTypes.LOST;
  const isStolen = marketType === MarketTypes.STOLEN;

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
      ? 'info'
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
        {pillText} / <span className="fas fa-comments mx-1"></span>
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
