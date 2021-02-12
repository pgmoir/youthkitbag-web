import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createMarketKit,
  editMarketKit,
} from '../../../actions/KitbagMarketActions';
import { DateForm, ImagesForm } from '../../includes/forms';
import Threads from '../../thread/Threads';
import validate from '../../includes/FormEmptyValidationRules';
import { getImages } from '../../../utils/image';
import { MarketTypes } from '../../../enums/marketTypes.enum';
import ArrayButtonRemove from '../../includes/controls/ArrayButtonRemove';
import CheckboxInput from '../../includes/controls/CheckboxInput';
import TextInputStd from '../../includes/controls/TextInputStd';
import TextInputCol from '../../includes/controls/TextInputCol';
import TextAreaInputStd from '../../includes/controls/TextAreaInputStd';
import SelectInputStd from '../../includes/controls/SelectInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  createMarketKit,
  editMarketKit,
};

const MarketKitForm = ({
  kitbagId,
  market,
  newErrors,
  createMarketKit,
  editMarketKit,
}) => {
  const initialValues = { ...market, images: getImages(market.images) };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    removeArrayItem,
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
      market.images = getImages(market.images);
      market.topImage =
        market.images && market.images.filter((i) => i.state !== 'D').length > 0
          ? market.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(market);
    }
  }, [market, setValues]);

  function updateMarket() {
    if (values._id) {
      editMarketKit(kitbagId, values._id, values);
    } else {
      createMarketKit(kitbagId, values);
    }
  }

  const showMarketType = () => {
    if (
      ![MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN].includes(
        market.marketType
      )
    )
      return null;

    if (isDisabled()) {
      return (
        <TextInputStd
          label="Type"
          value={values.marketType}
          field="marketType"
          disabled={true}
        />
      );
    }

    const typeItems = [MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN];

    return (
      <SelectInputStd
        colFormat="3-9"
        label="Type"
        value={values.marketType}
        field="marketType"
        handleChange={handleChange}
        error={errors.marketType}
        items={typeItems}
      />
    );
  };

  const showCondition = () => {
    if (![MarketTypes.TRADE].includes(market.marketType)) {
      return null;
    }

    if (isDisabled()) {
      return (
        <TextInputStd
          label="Condition"
          value={values.condition}
          field="condition"
          disabled={true}
        />
      );
    }

    const conditionItems = ['Used', 'New', 'Almost New', 'Other'];

    return (
      <SelectInputStd
        label="Condition"
        value={values.state}
        field="condition"
        handleChange={handleChange}
        error={errors.condition}
        items={conditionItems}
        disabled={isDisabled()}
        useItem={false}
      />
    );
  };

  const showPrice = () => {
    if (![MarketTypes.TRADE, MarketTypes.WANTED].includes(market.marketType)) {
      return null;
    }

    const label =
      market.marketType === MarketTypes.TRADE ? 'Asking Price' : 'Offer Price';

    return (
      <TextInputStd
        type="number"
        label={label}
        value={values.marketPrice}
        field="marketPrice"
        step=".01"
        min="0"
        max="29999.99"
        handleChange={handleChange}
        error={errors.marketPrice}
        disabled={isDisabled()}
      />
    );
  };

  const showStolenOn = () => {
    if (
      ![MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN].includes(
        values.marketType
      )
    ) {
      return null;
    }

    return (
      <DateForm
        colFormat="3-9"
        value={values.occurredOn}
        label="Occurred On"
        field="occurredOn"
        setChange={setChange}
        error={errors.occurredOn}
        disabled={isDisabled()}
      />
    );
  };

  const showSecurity = () => {
    if (
      ![MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN].includes(
        values.marketType
      )
    ) {
      return null;
    }

    return (
      <TextInputStd
        label="Security"
        value={values.security}
        field="security"
        handleChange={handleChange}
        error={errors.security}
        disabled={isDisabled()}
      />
    );
  };

  const showTracking = () => {
    if (![MarketTypes.STOLEN].includes(values.marketType)) {
      return null;
    }

    return (
      <TextInputStd
        label="Incident Number"
        value={values.tracking}
        field="tracking"
        handleChange={handleChange}
        error={errors.tracking}
      />
    );
  };

  const completedLabel = () => {
    if (!market.marketType) {
      return 'Completed';
    }

    switch (market.marketType) {
      case MarketTypes.STOLEN:
      case MarketTypes.LOST:
        return 'Recovered';
      case MarketTypes.FOUND:
        return 'Returned';
      case MarketTypes.WANTED:
        return 'Aquired';
      default:
        return 'Completed';
    }
  };

  const completedHelp = () => {
    let helpText = 'complete this trade';

    if (market.marketType) {
      switch (market.marketType) {
        case MarketTypes.STOLEN:
          helpText = 'recover this stolen item';
          break;
        case MarketTypes.LOST:
          helpText = 'recover this lost item';
          break;
        case MarketTypes.FOUND:
          helpText = 'return this lost item';
          break;
        case MarketTypes.WANTED:
          helpText = 'aquire this item';
          break;
        default:
          helpText = 'complete this trade';
          break;
      }
    }

    return `Have you managed to ${helpText}? If yes, great! Check this box so that it won't be included amongst the active market items anymore.`;
  };

  // convert to state
  const isDisabled = () => {
    if (market.completed) {
      return true;
    }
    if (!market.threads || market.threads.length === 0) {
      return false;
    }
    const closedThreadStates = ['withdraw', 'reject'];
    return (
      market.threads.filter((m) => closedThreadStates.includes(m.responseState))
        .length === 0
    );
  };

  return (
    <>
      <div className="columns mb-3">
        <div className="column">
          <ImagesForm
            values={values}
            setChange={setChange}
            addArrayItem={addArrayItem}
            disabled={isDisabled()}
            error={errors.images}
          />
        </div>
        <div className="column">
          <form onSubmit={handleSubmit}>
            {showMarketType()}
            <TextInputStd
              colFormat="3-9"
              label="Title"
              value={values.title}
              field="title"
              handleChange={handleChange}
              error={errors.title}
              disabled={isDisabled()}
            />
            <TextInputStd
              colFormat="3-9"
              label="Subtitle"
              value={values.subtitle}
              field="subtitle"
              handleChange={handleChange}
              error={errors.subtitle}
              disabled={isDisabled()}
            />
            <TextAreaInputStd
              colFormat="3-9"
              label="Description"
              value={values.description}
              field="description"
              handleChange={handleChange}
              error={errors.description}
              disabled={isDisabled()}
            />
            {showCondition()}
            {showPrice()}
            {showStolenOn()}
            {showSecurity()}
            {showTracking()}
            <TextInputStd
              colFormat="3-9"
              label="Activities"
              value={values.activitys}
              field="activitys"
              handleChange={handleChange}
              error={errors.activitys}
              disabled={isDisabled()}
            />
            {values._id && (
              <CheckboxInput
                label={completedLabel()}
                value={values.completed}
                field="completed"
                onChange={handleChange}
                error={errors.completed}
                help={completedHelp()}
              />
            )}
            <hr />
            <div>
              {values.groups &&
                values.groups.map((item, index) => (
                  <div className="columns" key={index}>
                    <TextInputCol
                      value={values.groups[index].name}
                      label="Name"
                      field={`groups[${index}].name`}
                      disabled={true}
                      index={index}
                      width="7"
                    />
                    <DateForm
                      value={values.groups[index].available}
                      label="Available"
                      field={`groups[${index}].available`}
                      setChange={setChange}
                      index={index}
                      width="4"
                    />
                    <input
                      name={`groups[${index}].include`}
                      type="hidden"
                      value={values.groups[index].include}
                    />
                    <ArrayButtonRemove
                      title="Remove Purchase"
                      onClick={() => removeArrayItem('groups', index)}
                      index={index}
                      disabled={values.groups.length <= 1}
                      width="1"
                    />
                  </div>
                ))}
              {errors.groups && (
                <label className="text-danger">{errors.groups}</label>
              )}
            </div>
            <hr />
            <div>
              {values.images &&
                values.images.map((item, index) => (
                  <div key={`${item._id}-${index}`}>
                    <input
                      name={`images[${index}]._id`}
                      type="hidden"
                      value={values.images[index]._id}
                    />
                    <input
                      name={`images[${index}].image`}
                      type="hidden"
                      value={values.images[index].image}
                    />
                    <input
                      name={`images[${index}].imageUrl`}
                      type="hidden"
                      value={values.images[index].imageUrl}
                    />
                    <input
                      name={`images[${index}].state`}
                      type="hidden"
                      value={values.images[index].state}
                    />
                    <input
                      name={`images[${index}].photoId`}
                      type="hidden"
                      value={values.images[index].photoId}
                    />
                  </div>
                ))}
              {values.deletedImages &&
                values.deletedImages.map((item, index) => (
                  <div key={`${item._id}-${index}`}>
                    <input
                      name={`deletedImages[${index}]._id`}
                      type="hidden"
                      value={values.deletedImages[index]._id}
                    />
                  </div>
                ))}
            </div>
            <div className="buttons">
              <button className="button is-primary" type="submit">
                Save
              </button>
              <Link className="button is-warning" to="/market">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
      {market._id && market.threads.length > 0 && (
        <>
          <hr />
          <div className="content">
            <p className="subtitle is-size-5">Offers and messages</p>
            <Threads
              threads={market.threads}
              kitbagId={market.kitbag}
              source="kitbag"
              marketType={market.marketType}
            />
          </div>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketKitForm);
