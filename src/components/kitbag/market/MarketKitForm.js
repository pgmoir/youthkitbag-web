import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createMarketKit,
  editMarketKit
} from '../../../actions/KitbagMarketActions';
import validate from './MarketKitFormValidationRules';
import {
  DateForm,
  TextForm,
  TextAreaForm,
  RemoveArrayButtonForm,
  ImagesForm,
  CheckboxForm,
  SelectForm
} from '../../includes/forms';
import Threads from '../../thread/threads/Threads';

const MarketForm = ({ market }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { ...market };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    removeArrayItem,
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
      setValues(market);
    }
  }, [market, setValues]);

  function updateMarket() {
    if (values._id) {
      dispatch(editMarketKit(values._id, values));
    } else {
      dispatch(createMarketKit(values));
    }
  }

  const showCondition = () => {
    if (!['trade'].includes(market.marketType)) {
      return null;
    }

    const conditionItems = ['Used', 'New', 'Almost New', 'Other'];

    return (
      <SelectForm
        colFormat="3-9"
        label="Condition"
        value={values.status}
        field="condition"
        handleChange={handleChange}
        error={errors.condition}
        items={conditionItems}
      />
    );
  };

  const showPrice = () => {
    if (!['trade', 'wanted'].includes(market.marketType)) {
      return null;
    }

    const label =
      market.marketType === 'trade' ? 'Asking Price' : 'Offer Price';

    return (
      <TextForm
        colFormat="3-9"
        type="number"
        label={label}
        value={values.marketPrice}
        field="marketPrice"
        step=".01"
        min="0"
        max="99999.99"
        handleChange={handleChange}
        error={errors.marketPrice}
      />
    );
  };

  const showStolenOn = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    return (
      <DateForm
        colFormat="3-9"
        value={values.occurredOn}
        label="Stolen On"
        field="occurredOn"
        setChange={setChange}
        error={errors.occurredOn}
      />
    );
  };

  const showSecurity = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    return (
      <TextForm
        colFormat="3-9"
        label="Security"
        value={values.security}
        field="security"
        handleChange={handleChange}
        error={errors.security}
      />
    );
  };

  const showTracking = () => {
    if (!['stolen'].includes(market.marketType)) {
      return null;
    }

    return (
      <TextForm
        colFormat="3-9"
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
      case 'stolen':
      case 'lost':
        return 'Recovered';
      case 'found':
        return 'Returned';
      case 'wanted':
        return 'Aquired';
      default:
        return 'Completed';
    }
  };

  const completedHelp = () => {
    let helpText = 'complete this trade';

    if (market.marketType) {
      switch (market.marketType) {
        case 'stolen':
          helpText = 'recover this stolen item';
          break;
        case 'lost':
          helpText = 'recover this lost item';
          break;
        case 'found':
          helpText = 'return this lost item';
          break;
        case 'wanted':
          helpText = 'aquire this item';
          break;
        default:
          helpText = 'complete this trade';
          break;
      }
    }

    return `Have you managed to ${helpText}? If yes, great! Check this box so that it won't be included amongst the active market items anymore.`;
  };

  return (
    <React.Fragment>
      <div className="row">
        <ImagesForm
          values={values}
          setChange={setChange}
          addArrayItem={addArrayItem}
        />
        <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
          <form className="mb-3" onSubmit={handleSubmit}>
            <TextForm
              colFormat="3-9"
              label="Title"
              value={values.title}
              field="title"
              handleChange={handleChange}
              error={errors.title}
            />
            <TextForm
              colFormat="3-9"
              label="Subtitle"
              value={values.subtitle}
              field="subtitle"
              handleChange={handleChange}
              error={errors.subtitle}
            />
            <TextAreaForm
              colFormat="3-9"
              label="Description"
              value={values.description}
              field="description"
              handleChange={handleChange}
              error={errors.description}
            />
            {showCondition()}
            {showPrice()}
            {showStolenOn()}
            {showSecurity()}
            {showTracking()}
            <TextForm
              colFormat="3-9"
              label="Activities"
              value={values.activitys}
              field="activitys"
              handleChange={handleChange}
              error={errors.activitys}
            />
            {values._id && (
              <CheckboxForm
                colFormat="3-1-8"
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
                  <div className="form-row" key={index}>
                    <TextForm
                      colFormat="a-6"
                      value={values.groups[index].name}
                      label="Name"
                      field={`groups[${index}].name`}
                      readOnly={true}
                      index={index}
                    />
                    <DateForm
                      colFormat="a-4"
                      value={values.groups[index].available}
                      label="Available"
                      field={`groups[${index}].available`}
                      setChange={setChange}
                      index={index}
                    />
                    <input
                      name={`groups[${index}].include`}
                      type="hidden"
                      value={values.groups[index].include}
                    />
                    <RemoveArrayButtonForm
                      colFormat="a-2"
                      title="Remove Purchase"
                      onClick={() => removeArrayItem('groups', index)}
                      index={index}
                    />
                  </div>
                ))}
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
            <div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <Link className="btn btn-link" to="/market">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
      {market._id && market.threads.length > 0 && (
        <React.Fragment>
          <div className="row">
            <div className="col-12">
              <h4>{`All messages about "${market.title}"`}</h4>
            </div>
          </div>
          <Threads threads={market.threads} source="kitbag" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MarketForm;
