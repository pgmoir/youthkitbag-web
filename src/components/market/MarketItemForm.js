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
import Threads from '../threads/Threads';
import validate from '../includes/FormEmptyValidationRules';
import { ImagesDisplay } from '../includes/images';
import { MarketTypes } from '../../enums/marketTypes.enum';
import TextInput from '../includes/controls/TextInput';
import { getDateSpan } from '../../utils/date';
import { getFirstImageExcludeDeleted } from '../../utils/image';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors
});

const mapDispatchToProps = {
  respondMarketItem
};

const MarketItemForm = ({ market, newErrors, respondMarketItem }) => {
  const navigate = useNavigate();
  const initialValues = {
    _id: '',
    responseOn: '',
    details: '',
    responsePrice: 0
  };

  const { handleChange, handleSubmit, values, setValues, errors, setErrors } =
    useForm(initialValues, updateMarket, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (market) {
      market.topImage = getFirstImageExcludeDeleted({ images: market.images });
    }
  }, [market]);

  useEffect(() => {
    if (market) {
      setValues({
        _id: market._id,
        responseOn: '',
        details: '',
        responsePrice: 0
      });
    }
  }, [market, setValues]);

  function updateMarket() {
    respondMarketItem(values._id, values);
    navigate(`/market/${marketId}`);
  }

  const showCondition = () => {
    if (![MarketTypes.TRADE].includes(market.marketType)) {
      return null;
    }

    return (
      <TextInput label="Condition" value={market.condition} readOnly={true} />
    );
  };

  const showPrice = () => {
    if (![MarketTypes.TRADE, MarketTypes.WANTED].includes(market.marketType)) {
      return null;
    }

    const label =
      market.marketType === MarketTypes.TRADE ? 'Asking Price' : 'Offering';
    const price =
      market.marketPrice === 0
        ? 'Recycle'
        : `£${market.marketPrice.toFixed(2)}`;

    return <TextInput label={label} value={price} readOnly={true} />;
  };

  const showStolenOn = () => {
    if (
      ![MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN].includes(
        market.marketType
      )
    ) {
      return null;
    }

    return (
      <TextInput
        label={`${capitalize(market.marketType)} on`}
        value={getDateSpan(market.occurredOn)}
        readOnly={true}
      />
    );
  };

  const showSecurity = () => {
    if (![MarketTypes.STOLEN].includes(market.marketType)) {
      return null;
    }

    if (!market.security || market.security.length === 0) return null;

    return (
      <TextInput
        label="Security reference"
        value={market.security}
        readOnly={true}
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
      <TextInput label="Incident Number" value={tracking} readOnly={true} />
    );
  };

  const responseComponents = {
    found: FoundResponse,
    lost: LostResponse,
    stolen: StolenResponse,
    trade: TradeResponse,
    wanted: WantedResponse
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
          <TextInput
            label="Description"
            value={market.description}
            readOnly={true}
          />
          {showCondition()}
          {showPrice()}
          {showSecurity()}
          {showTracking()}
          <TextInput
            label="Activities"
            value={market.activitys?.join(', ')}
            readOnly={true}
          />
          <TextInput
            label="tags"
            value={market.tags?.join(', ')}
            readOnly={true}
          />
          {market.threads.length === 0 && (
            <>
              <hr />
              <Response
                values={values}
                handleChange={handleChange}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      </div>
      {market?.threads?.length > 0 && (
        <>
          <hr />
          <div className="content">
            <p className="subtitle is-size-5">{`Chat for "${market.title}"`}</p>
            <Threads
              threads={market.threads}
              kitbagId={market.kitbag}
              source="market"
              marketType={market.marketType}
            />
          </div>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItemForm);
