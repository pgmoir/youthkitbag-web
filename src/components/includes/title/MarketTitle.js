import React from 'react';
import { Helmet } from 'react-helmet';
import useMarketType from '../../hooks/useMarketType';

const MarketTitle = ({ market, isOwned }) => {
  const { title, subtitle, marketType, marketPrice, threads } = market;

  const { icon, iconTitle, color, pill } = useMarketType(
    marketType,
    marketPrice,
    threads,
    isOwned
  );

  if (title === '') {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${title} - YouthKitbag`}</title>
      </Helmet>
      <div className="columns">
        <div className="column is-two-thirds">
          <h1 className="title is-size-4">{title}</h1>
          <h2 className="subtitle is-size-5">{subtitle}</h2>
        </div>
        <div className="column is-one-third has-text-left-mobile has-text-right">
          <span className={`tag is-rounded is-large is-size-4 is-${color}`}>
            <span className={`${icon} pr-2`} title={iconTitle}></span>
            {pill}
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default MarketTitle;
