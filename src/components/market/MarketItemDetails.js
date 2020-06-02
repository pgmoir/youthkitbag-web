import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { capitalize } from '../../utils/strings';
import { respondMarketItem } from '../../actions/MarketActions';
import FoundResponse from './response/FoundResponse';
import LostResponse from './response/LostResponse';
import StolenResponse from './response/StolenResponse';
import TradeResponse from './response/TradeResponse';
import WantedResponse from './response/WantedResponse';
import Threads from '../thread/threads/Threads';
import validate from '../includes/FormEmptyValidationRules';
import { ImagesDisplay } from '../includes/forms/ImagesDisplay';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  respondMarketItem,
};

const MarketItemDetails = ({ market, newErrors, respondMarketItem }) => {
  const initialValues = {
    _id: '',
    responseOn: '',
    details: '',
    responsePrice: 0,
  };

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    setErrors,
  } = useForm(initialValues, updateMarket, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (market) {
      market.topImage =
        market.images && market.images.filter((i) => i.state !== 'D').length > 0
          ? market.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
    }
  }, [market]);

  useEffect(() => {
    if (market) {
      setValues({
        _id: market._id,
        responseOn: '',
        details: '',
        responsePrice: 0,
      });
    }
  }, [market, setValues]);

  function updateMarket() {
    respondMarketItem(values._id, values);
  }

  const showCondition = () => {
    if (!['trade'].includes(market.marketType)) {
      return null;
    }

    return (
      <p>
        <strong>Condition: </strong>
        <br />
        {market.condition}
      </p>
    );
  };

  const showPrice = () => {
    if (!['trade', 'wanted'].includes(market.marketType)) {
      return null;
    }

    const label = market.marketType === 'trade' ? 'Asking Price' : 'Offering';
    const price =
      market.marketPrice === 0 ? 'free' : `£${market.marketPrice.toFixed(2)}`;

    return (
      <p>
        <strong>{label}: </strong>
        <br />
        {price}
      </p>
    );
  };

  const showStolenOn = () => {
    if (!['found', 'lost', 'stolen'].includes(market.marketType)) {
      return null;
    }

    const occurredOn = new Date(market.occurredOn).toDateString();

    return (
      <p>
        <strong>{capitalize(market.marketType)} on: </strong>
        <br />
        {occurredOn}
      </p>
    );
  };

  const showSecurity = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    if (!market.security || market.security.length === 0) return null;

    return (
      <p>
        <strong>Security reference: </strong>
        <br />
        {market.security}
      </p>
    );
  };

  const showTracking = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    const tracking = !market.tracking
      ? 'Police incident number not available'
      : market.tracking;

    return (
      <p>
        <strong>Incident Number: </strong>
        <br />
        {tracking}
      </p>
    );
  };

  const responseComponents = {
    found: FoundResponse,
    lost: LostResponse,
    stolen: StolenResponse,
    trade: TradeResponse,
    wanted: WantedResponse,
  };
  const Response = responseComponents[market.marketType || 'trade'];

  return (
    <React.Fragment>
      <div className="row">
        <ImagesDisplay images={market.images} />
        <div className="col-12 col-lg-6 order-2 order-lg-1 pr-3" role="main">
          {showStolenOn()}
          <p>
            <strong>Description: </strong>
            <br />
            {market.description}
          </p>
          {showCondition()}
          {showPrice()}
          {showSecurity()}
          {showTracking()}
          <p className="mb-0">
            <strong>Activities: </strong>
          </p>
          <ul>
            {market.activitys.map((m, i) => {
              return <li key={i}>{m}</li>;
            })}
          </ul>
          <hr />
          {market.threads.length === 0 && (
            <Response
              values={values}
              handleChange={handleChange}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
      {market._id && market.threads.length > 0 && (
        <React.Fragment>
          <div className="row">
            <div className="col-12">
              <h4>{`Thread for "${market.title}"`}</h4>
            </div>
          </div>
          <Threads
            threads={market.threads}
            accountId={market.account}
            source="market"
            marketType={market.marketType}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItemDetails);
