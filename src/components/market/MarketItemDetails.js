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
import FoundResponded from './responded/FoundResponded';
import LostResponded from './responded/LostResponded';
import StolenResponded from './responded/StolenResponded';
import TradeResponded from './responded/TradeResponded';
import WantedResponded from './responded/WantedResponded';

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

  const responseComponents = {
    found: FoundResponse,
    lost: LostResponse,
    stolen: StolenResponse,
    trade: TradeResponse,
    wanted: WantedResponse
  };
  const Response = responseComponents[market.marketType || 'trade'];

  const respondedComponents = {
    found: FoundResponded,
    lost: LostResponded,
    stolen: StolenResponded,
    trade: TradeResponded,
    wanted: WantedResponded
  };
  const Responded = respondedComponents[market.marketType || 'trade'];

  return (
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
        <TextForm
          colFormat="3-9"
          label="Condition"
          value={market.condition}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Asking Price"
          value={`£${market.marketPrice.toFixed(2)}`}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={market.activitys}
          readOnly={true}
        />
        <hr />
        {market.responseDetails && market.responseDetails.length === 0 && (
          <React.Fragment>
            <Response
              values={values}
              handleChange={handleChange}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          </React.Fragment>
        )}
        {market.responseDetails && market.responseDetails.length > 0 && (
          <React.Fragment>
            <Responded responseDetails={market.responseDetails[0]} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default MarketItemDetails;
