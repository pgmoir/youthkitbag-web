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

  function render() {
    if (title === '') {
      return <div className="container pb-3"></div>;
    }

    return (
      <>
        <Helmet>
          <title>{`${title} - YouthKitbag`}</title>
        </Helmet>
        <section
          id="title"
          className="container-fluid px-0"
          role="banner"
          aria-label="breadcrumb navigation and page title"
        >
          <div className="container d-flex border-bottom-1">
            <div className={`p-3 align-self-center text-${color} h1`}>
              <span
                className={`${icon} has-text-centered`}
                title={iconTitle}
              ></span>
            </div>
            <div className="w-100">
              <div className="py-3">
                <h1 className={`m-0 text-${color}`}>{title}</h1>
              </div>
              {subtitle && (
                <div className="pb-3">
                  <h2 className="m-0">{subtitle}</h2>
                </div>
              )}
            </div>
            <div className="d-flex flex-column">
              <div className="p-3 h1">
                <span
                  className={`badge badge-pill ${
                    isOwned ? `badge-light text-${color}` : `badge-${color}`
                  }`}
                >
                  {pill}
                </span>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return <>{render()}</>;
};

export default MarketTitle;
