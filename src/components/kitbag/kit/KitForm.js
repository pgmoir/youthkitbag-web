import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import useForm from '../../hooks/useForm';
import {
  createKitbagKit,
  editKitbagKit,
} from '../../../actions/KitbagKitActions';
import { ImagesForm } from '../../includes/images';
import validate from '../../includes/FormEmptyValidationRules';
import { getFirstImageExcludeDeleted, getImages } from '../../../utils/image';
import TextInput from '../../includes/controls/TextInput';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import SelectInput from '../../includes/controls/SelectInput';
import ArrayButtonAdd from '../../includes/controls/ArrayButtonAdd';
import ArrayButtonRemove from '../../includes/controls/ArrayButtonRemove';
import CheckBoxInput from '../../includes/controls/CheckBoxInput';
import DateInput from '../../includes/controls/DateInput';

const mapStateToProps = (state) => ({
  kitbagLists: state.kitbag.kit.lists,
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  createKitbagKit,
  editKitbagKit,
};

const KitForm = ({
  kitbagId,
  kit,
  kitbagLists,
  newErrors,
  createKitbagKit,
  editKitbagKit,
}) => {
  const initialValues = { ...kit, images: getImages(kit.images) };
  const initialPurchase = {
    from: '',
    quantity: 0,
    ondate: new Date(),
    price: 0.0,
  };
  const initialInbag = { location: '', condition: 'used', quantity: 0 };

  const statusItems = [
    'Owned',
    'Trade',
    'Sold',
    'Stolen',
    'Wanted',
    'Recycled',
    'Trashed',
    'Given Away',
    'Donated',
    'Lost',
    'Found',
    'Other',
  ];

  const conditionItems = ['Used', 'New', 'Almost New', 'Other'];

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
  } = useForm(initialValues, updateKit, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (kit) {
      kit.images = getImages(kit.images);
      kit.topImage = getFirstImageExcludeDeleted({ images: kit.images });
      setValues(kit);
    }
  }, [kit, setValues]);

  function updateKit() {
    if (values._id) {
      editKitbagKit(kitbagId, values._id, values);
    } else {
      createKitbagKit(kitbagId, values);
    }
  }

  return (
    <div className="columns mb-3">
      <div className="column">
        <ImagesForm
          kitbagId={kitbagId}
          values={values}
          setChange={setChange}
          addArrayItem={addArrayItem}
          error={errors.images}
        />
      </div>
      <div className="column">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            value={values.title}
            field="title"
            handleChange={handleChange}
            error={errors.title}
          />
          <TextInput
            label="Subtitle"
            value={values.subtitle}
            field="subtitle"
            handleChange={handleChange}
            error={errors.subtitle}
          />
          <TextAreaInput
            label="Description"
            value={values.description}
            field="description"
            handleChange={handleChange}
            error={errors.description}
          />
          <SelectInput
            label="Status"
            value={values.status}
            field="status"
            handleChange={handleChange}
            error={errors.status}
            items={statusItems}
          />
          <hr />
          <div>
            <p className="has-text-weight-bold mb-3">
              Purchased (From, Quantity, On, Cost)
            </p>
            {values.purchases &&
              values.purchases.map((item, index) => (
                <div
                  className="is-flex is-flex-wrap-wrap is-flex-purchases"
                  key={index}
                >
                  <div className="mr-3 mb-3 purchased-from">
                    <TextInput
                      value={values.purchases[index].from}
                      field={`purchases[${index}].from`}
                      handleChange={handleChange}
                      autoList={kitbagLists.purchasesFroms}
                      placeHolder="From"
                      iconRight={false}
                    />
                  </div>
                  <div className="mr-3 mb-3 quantity">
                    <TextInput
                      type="number"
                      value={values.purchases[index].quantity}
                      field={`purchases[${index}].quantity`}
                      step="1"
                      min="0"
                      max="9999"
                      handleChange={handleChange}
                      iconRight={false}
                    />
                  </div>
                  <div className="mr-3 mb-3 ondate">
                    <DateInput
                      value={values.purchases[index].ondate}
                      field={`purchases[${index}].ondate`}
                      setChange={setChange}
                      placeHolder="17-Jan-2021"
                    />
                  </div>
                  <div className="mr-3 mb-3 price">
                    <TextInput
                      type="number"
                      value={values.purchases[index].price}
                      field={`purchases[${index}].price`}
                      step=".01"
                      min="0.00"
                      max="29999.99"
                      handleChange={handleChange}
                      iconRight={false}
                    />
                  </div>
                  <div className="mx-1 mb-5">
                    <ArrayButtonRemove
                      title="Remove Purchase"
                      onClick={() => removeArrayItem('purchases', index)}
                      index={index}
                    />
                  </div>
                </div>
              ))}
            <ArrayButtonAdd
              label="Add a new purchase"
              onClick={() => addArrayItem('purchases', [initialPurchase])}
            />
          </div>
          <hr />
          <div>
            <p className="has-text-weight-bold mb-3">
              Stored (Location, Condition, Quantity)
            </p>
            {values.inbag &&
              values.inbag.map((item, index) => (
                <div
                  className="is-flex is-flex-wrap-wrap is-flex-stored"
                  key={index}
                >
                  <div className="mr-3 mb-3 location">
                    <TextInput
                      value={values.inbag[index].location}
                      field={`inbag[${index}].location`}
                      handleChange={handleChange}
                      placeHolder="Location"
                      iconRight={false}
                    />
                  </div>
                  <div className="mr-3 mb-3 condition">
                    <SelectInput
                      value={values.inbag[index].condition}
                      field={`inbag[${index}].condition`}
                      handleChange={handleChange}
                      items={conditionItems}
                    />
                  </div>
                  <div className="mr-3 mb-3 quantity">
                    <TextInput
                      type="number"
                      value={values.inbag[index].quantity}
                      field={`inbag[${index}].quantity`}
                      step="1"
                      min="0"
                      max="9999"
                      handleChange={handleChange}
                      placeHolder="Qty"
                      iconRight={false}
                    />
                  </div>
                  <div className="mx-1 mb-5">
                    <ArrayButtonRemove
                      title="Remove Inbag"
                      onClick={() => removeArrayItem('inbag', index)}
                      index={index}
                    />
                  </div>
                </div>
              ))}
            <ArrayButtonAdd
              label="Add a new storage location"
              onClick={() => addArrayItem('inbag', [initialInbag])}
            />
          </div>
          <hr />
          <TextInput
            type="number"
            value={values.warning}
            label="Warning Level"
            field="warning"
            step="1"
            min="0"
            max="9999"
            handleChange={handleChange}
            error={errors.warning}
          />
          <hr />
          <div className="content">
            <p className="is-size-6 has-text-weight-bold">
              Categorise/Security (all optional)
            </p>
            <p
              id="categoryhelp"
              className="form-text text-muted form-control-help mb-3"
            >
              You can add activity names, personal tags and security numbers to
              your kit. Enter names separate by commas. (e.g. football, cycling)
            </p>
          </div>
          <TextInput
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <TextInput
            label="Tags"
            value={values.tags}
            field="tags"
            handleChange={handleChange}
            error={errors.tags}
          />
          <TextInput
            label="Security"
            value={values.security}
            field="security"
            handleChange={handleChange}
            error={errors.security}
          />
          <CheckBoxInput
            label="Active"
            value={values.active}
            field="active"
            onChange={handleChange}
            error={errors.active}
            help="This item is automatically switched off when state is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search."
          />
          <hr />
          <div className="buttons">
            <button className="button is-primary" type="submit">
              Save
            </button>
            <Link className="button is-warning" to={`/kitbag/kit/${kitbagId}`}>
              Cancel
            </Link>
          </div>
          <div className="is-sticky-bottomright icon-text">
            <div
              onClick={handleSubmit}
              onKeyPress={handleSubmit}
              className="icon is-extralarge has-background-primary is-clickable has-text-light is-rounded m-5"
              title="Add new item to your kitbag"
              role="button"
              tabIndex="0"
            >
              <i className="fas fa-save"></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitForm);
