import React from 'react';
import { MarketTypes } from '../../enums/marketTypes.enum';

const useMarketType = ({
  marketId,
  marketType,
  marketPrice,
  threads,
  isOwned,
}) => {
  const isTrade =
    marketType === MarketTypes.TRADE && (marketPrice > 0 || !marketId);
  const isRecycle =
    marketType === MarketTypes.TRADE && marketPrice === 0 && marketId;
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
    isFound || isStolen
      ? 'danger'
      : isLost
      ? 'warning'
      : isWanted || isWantRecycle
      ? 'info'
      : isRecycle
      ? 'success'
      : 'primary';

  const pillText =
    isTrade || isWanted
      ? `£${marketPrice.toFixed(2)}`
      : isRecycle || isWantRecycle
      ? 'Recycle'
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

  const hasMarketType = isRecycle ? MarketTypes.RECYCLE : marketType;

  return {
    icon,
    iconTitle,
    color,
    pill,
    hasMarketType,
  };
};

export default useMarketType;
