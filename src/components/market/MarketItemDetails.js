import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { respondMarketItem } from '../../actions/MarketActions';
import { TextForm, TextAreaForm } from '../includes/forms';
import validate from './MarketItemDetailsValidationRules';
import FoundResponse from './response/FoundResponse';
import LostResponse from './response/LostResponse';
import StolenResponse from './response/StolenResponse';
import TradeResponse from './response/TradeResponse';
import WantedResponse from './response/WantedResponse';
import Threads from '../thread/threads/Threads';

const MarketItemDetails = ({ market }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = {
    _id: '',
    responseOn: '',
    details: '',
    responsePrice: 0
  };

  const {
    setChange,
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(initialValues, updateMarket, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (market) {
      market.topImage =
        market.images && market.images.filter(i => i.state !== 'D').length > 0
          ? market.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
    }
  }, [market]);

  function renderSecondaryImages() {
    if (!market || !market.images) {
      return null;
    }

    const { images } = market;
    const items = [];

    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          <React.Fragment>
            <img
              className="img-fluid mb-3 img-link mini-img mr-1"
              src={images[i].imageUrl}
              alt=""
              role="presentation"
              onClick={renderTopImage.bind(null, images[i].imageUrl)}
            />
          </React.Fragment>
        </div>
      );
    }

    return <div>{items}</div>;
  }

  function renderTopImage(src) {
    setChange('topImage', src);
  }

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
    dispatch(respondMarketItem(values._id, values));
  }

  const showCondition = () => {
    if (!['trade'].includes(market.marketType)) {
      return null;
    }

    return (
      <TextForm
        colFormat="3-9"
        label="Condition"
        value={market.condition}
        readOnly={true}
      />
    );
  };

  const showPrice = () => {
    if (!['trade', 'wanted'].includes(market.marketType)) {
      return null;
    }

    const label =
      market.marketType === 'trade' ? 'Asking Price' : 'Offer Price';
    const price =
      market.marketPrice === 0 ? 'FREE' : `£${market.marketPrice.toFixed(2)}`;

    return (
      <TextForm colFormat="3-9" label={label} value={price} readOnly={true} />
    );
  };

  const showStolenOn = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    const occurredOn = new Date(market.occurredOn).toDateString();

    return (
      <TextForm
        colFormat="3-9"
        label="Stolen On"
        value={occurredOn}
        readOnly={true}
      />
    );
  };

  const showSecurity = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    const security = !market.security
      ? 'Frame number not available'
      : market.security;

    return (
      <TextForm
        colFormat="3-9"
        label="Security"
        value={security}
        readOnly={true}
      />
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
      <TextForm
        colFormat="3-9"
        label="Incident Number"
        value={tracking}
        readOnly={true}
      />
    );
  };

  const responseComponents = {
    found: FoundResponse,
    lost: LostResponse,
    stolen: StolenResponse,
    trade: TradeResponse,
    wanted: WantedResponse
  };
  const Response = responseComponents[market.marketType || 'trade'];

  return (
    <React.Fragment>
      {market._id && (
        <div className="row">
          <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
            <div>
              <img
                id="preview"
                name="preview"
                className="img-fluid mb-3"
                src={market.topImage}
                alt=""
                role="presentation"
              />
            </div>
            <div>{renderSecondaryImages()}</div>
          </div>
          <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
            <TextForm
              colFormat="3-9"
              label="Subtitle"
              value={market.subtitle}
              readOnly={true}
            />
            <TextAreaForm
              colFormat="3-9"
              label="Description"
              value={market.description}
              readOnly={true}
            />
            {showCondition()}
            {showPrice()}
            {showStolenOn()}
            {showSecurity()}
            {showTracking()}
            <TextForm
              colFormat="3-9"
              label="Activities"
              value={market.activitys}
              readOnly={true}
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
      )}
      {market._id && market.threads.length > 0 && (
        <React.Fragment>
          <div className="row">
            <div className="col-12">
              <h4>{`Thread for "${market.title}"`}</h4>
            </div>
          </div>
          <Threads threads={market.threads} source="market" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MarketItemDetails;
