import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import useForm from '../../hooks/useForm';
import {
  createMarketKit,
  editMarketKit,
} from '../../../actions/KitbagMarketActions';
import { ImagesForm } from '../../includes/forms';
import Threads from '../../threads/Threads';
import validate from '../../includes/FormEmptyValidationRules';
import { getImages } from '../../../utils/image';
import { MarketTypes } from '../../../enums/marketTypes.enum';
import ArrayButtonRemove from '../../includes/controls/ArrayButtonRemove';
import CheckBoxInput from '../../includes/controls/CheckBoxInput';
import TextInput from '../../includes/controls/TextInput';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import SelectInput from '../../includes/controls/SelectInput';
import DateInput from '../../includes/controls/DateInput';

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
        <TextInput
          label="Type"
          value={values.marketType}
          field="marketType"
          disabled={true}
        />
      );
    }

    const typeItems = [MarketTypes.FOUND, MarketTypes.LOST, MarketTypes.STOLEN];

    return (
      <SelectInput
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
        <TextInput
          label="Condition"
          value={values.condition}
          field="condition"
          disabled={true}
        />
      );
    }

    const conditionItems = ['Used', 'New', 'Almost New', 'Other'];

    return (
      <SelectInput
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
      <TextInput
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
      <DateInput
        label="Occurred On"
        value={values.occurredOn}
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
      <TextInput
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
      <TextInput
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
            <TextInput
              label="Title"
              value={values.title}
              field="title"
              handleChange={handleChange}
              error={errors.title}
              disabled={isDisabled()}
            />
            <TextInput
              label="Subtitle"
              value={values.subtitle}
              field="subtitle"
              handleChange={handleChange}
              error={errors.subtitle}
              disabled={isDisabled()}
            />
            <TextAreaInput
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
            <TextInput
              label="Activities"
              value={values.activitys}
              field="activitys"
              handleChange={handleChange}
              error={errors.activitys}
              disabled={isDisabled()}
            />
            {values._id && (
              <CheckBoxInput
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
              <p className="has-text-weight-bold mb-3">
                Group Shares (With, Available On)
              </p>
              {values.groups &&
                values.groups.map((item, index) => (
                  <div
                    className="is-flex is-flex-wrap-wrap is-flex-groupshare"
                    key={index}
                  >
                    <div className="mr-3 mb-3 name">
                      <TextInput
                        value={values.groups[index].name}
                        field={`groups[${index}].name`}
                        disabled={true}
                        iconRight={false}
                      />
                    </div>
                    <div className="mr-3 mb-3 ondate">
                      <DateInput
                        value={values.groups[index].available}
                        field={`groups[${index}].available`}
                        setChange={setChange}
                        placeHolder="17-Jan-2021"
                      />
                    </div>
                    <div className="mx-1 mb-5">
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
                      />
                    </div>
                  </div>
                ))}
              {errors.groups && (
                <label className="text-danger">{errors.groups}</label>
              )}
            </div>
            <hr className="mt-0" />
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
