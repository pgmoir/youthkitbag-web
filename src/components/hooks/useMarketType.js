const useMarketType = (marketType, marketPrice) => {
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

  const pill =
    isTrade || isWanted
      ? `£${marketPrice.toFixed(2)}`
      : isRecycle || isWantRecycle
      ? 'free'
      : marketType;

  return {
    icon,
    iconTitle,
    color,
    pill,
  };
};

export default useMarketType;
