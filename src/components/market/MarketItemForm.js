import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { capitalize } from '../../utils/strings';
import { respondMarketItem } from '../../actions/MarketActions';
import { FoundResponse } from './response/FoundResponse';
import { LostResponse } from './response/LostResponse';
import { StolenResponse } from './response/StolenResponse';
import { TradeResponse } from './response/TradeResponse';
import { WantedResponse } from './response/WantedResponse';
import Threads from '../thread/threads/Threads';
import validate from '../includes/FormEmptyValidationRules';
import { ImagesDisplay } from '../includes/forms/ImagesDisplay';
import { MarketTypes } from '../../enums/marketTypes.enum';
import TextInputStd from '../includes/controls/TextInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  respondMarketItem,
};

const MarketItemForm = ({ market, newErrors, respondMarketItem }) => {
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
    if (![MarketTypes.TRADE].includes(market.marketType)) {
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
    if (![MarketTypes.TRADE, MarketTypes.WANTED].includes(market.marketType)) {
      return null;
    }

    const label =
      market.marketType === MarketTypes.TRADE ? 'Asking Price' : 'Offering';
    const price =
      market.marketPrice === 0 ? 'free' : `£${market.marketPrice.toFixed(2)}`;

    return (
      <TextInputStd
        label={label}
        value={price}
        readOnly={true}
        addClassName="is-static"
      />
    );
  };

  const showStolenOn = () => {
    if (
      ![MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN].includes(
        market.marketType
      )
    ) {
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
    if (![MarketTypes.STOLEN].includes(market.marketType)) {
      return null;
    }

    if (!market.security || market.security.length === 0) return null;

    return (
      <TextInputStd
        label="Security reference"
        value={market.security}
        readOnly={true}
        addClassName="is-static"
      />
    );
  };

  const showTracking = () => {
    if (![MarketTypes.STOLEN].includes(market.marketType)) {
      return null;
    }

    const tracking = !market.tracking
      ? 'Police incident number not available'
      : market.tracking;

    return (
      <TextInputStd
        label="Incident Number"
        value={tracking}
        readOnly={true}
        addClassName="is-static"
      />
    );
  };

  const responseComponents = {
    found: FoundResponse,
    lost: LostResponse,
    stolen: StolenResponse,
    trade: TradeResponse,
    wanted: WantedResponse,
  };

  const Response =
    responseComponents[market.marketType.toLowerCase() || MarketTypes.TRADE];

  return (
    <>
      <div className="columns mb-3">
        <div className="column">
          <ImagesDisplay images={market.images} />
        </div>
        <div className="column">
          {showStolenOn()}
          <TextInputStd
            label="Description"
            value={market.description}
            readOnly={true}
            addClassName="is-static"
          />
          {showCondition()}
          {showPrice()}
          {showSecurity()}
          {showTracking()}
          <TextInputStd
            label="Activities"
            value={market.activitys?.join(', ')}
            readOnly={true}
            addClassName="is-static"
          />
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
      {/* {market.threads.length > 0 && (
        <>
          <div className="row">
            <div className="col-12">
              <h4>{`Thread for "${market.title}"`}</h4>
            </div>
          </div>
          <Threads
            threads={market.threads}
            kitbagId={market.kitbag}
            source="market"
            marketType={market.marketType}
          />
        </>
      )} */}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItemForm);
