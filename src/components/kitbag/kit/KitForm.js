import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagKit,
  editKitbagKit,
} from '../../../actions/KitbagKitActions';
import { DateForm, CheckboxForm, ImagesForm } from '../../includes/forms';
import validate from '../../includes/FormEmptyValidationRules';
import { getImages } from '../../../utils/image';
import TextInputStd from '../../includes/controls/TextInputStd';
import TextAreaInputStd from '../../includes/controls/TextAreaInputStd';
import SelectInputStd from '../../includes/controls/SelectInputStd';
import SelectInputCol from '../../includes/controls/SelectInputCol';
import TextInputCol from '../../includes/controls/TextInputCol';
import ArrayButtonAdd from '../../includes/controls/ArrayButtonAdd';
import ArrayButtonRemove from '../../includes/controls/ArrayButtonRemove';

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
  const initialPurchase = { from: '', quantity: 0, ondate: '', price: 0.0 };
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
      kit.topImage =
        kit.images && kit.images.filter((i) => i.state !== 'D').length > 0
          ? kit.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
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
          <TextInputStd
            label="Title"
            value={values.title}
            field="title"
            handleChange={handleChange}
            error={errors.title}
          />
          <TextInputStd
            label="Subtitle"
            value={values.subtitle}
            field="subtitle"
            handleChange={handleChange}
            error={errors.subtitle}
          />
          <TextAreaInputStd
            label="Description"
            value={values.description}
            field="description"
            handleChange={handleChange}
            error={errors.description}
          />
          <SelectInputStd
            label="Status"
            value={values.status}
            field="status"
            handleChange={handleChange}
            error={errors.status}
            items={statusItems}
          />
          <hr />
          <div>
            {values.purchases &&
              values.purchases.map((item, index) => (
                <div className="columns" key={index}>
                  <TextInputCol
                    value={values.purchases[index].from}
                    label="Purchased from"
                    field={`purchases[${index}].from`}
                    handleChange={handleChange}
                    index={index}
                    autoList={kitbagLists.purchasesFroms}
                    width="3"
                  />
                  <TextInputCol
                    type="number"
                    value={values.purchases[index].quantity}
                    label="Quantity"
                    field={`purchases[${index}].quantity`}
                    step="1"
                    min="0"
                    max="9999"
                    handleChange={handleChange}
                    index={index}
                    width="2"
                  />
                  <DateForm
                    colFormat="a-4"
                    value={values.purchases[index].ondate}
                    label="On"
                    field={`purchases[${index}].ondate`}
                    setChange={setChange}
                    index={index}
                  />
                  <TextInputCol
                    type="number"
                    value={values.purchases[index].price}
                    label="Price"
                    field={`purchases[${index}].price`}
                    step=".01"
                    min="0.00"
                    max="29999.99"
                    handleChange={handleChange}
                    index={index}
                    width="2"
                  />
                  <ArrayButtonRemove
                    title="Remove Purchase"
                    onClick={() => removeArrayItem('purchases', index)}
                    index={index}
                    width="1"
                  />
                </div>
              ))}
            <ArrayButtonAdd
              label="Add a new purchase"
              onClick={() => addArrayItem('purchases', [initialPurchase])}
            />
          </div>
          <hr />
          <div>
            {values.inbag &&
              values.inbag.map((item, index) => (
                <div className="columns" key={index}>
                  <TextInputCol
                    value={values.inbag[index].location}
                    label="Storage location"
                    field={`inbag[${index}].location`}
                    handleChange={handleChange}
                    index={index}
                    width="4"
                  />
                  <SelectInputCol
                    label="Condition"
                    value={values.inbag[index].condition}
                    field={`inbag[${index}].condition`}
                    handleChange={handleChange}
                    items={conditionItems}
                    index={index}
                    width="4"
                  />
                  <TextInputCol
                    type="number"
                    value={values.inbag[index].quantity}
                    label="Quantity"
                    field={`inbag[${index}].quantity`}
                    step="1"
                    min="0"
                    max="9999"
                    handleChange={handleChange}
                    index={index}
                    width="3"
                  />
                  <ArrayButtonRemove
                    title="Remove Inbag"
                    onClick={() => removeArrayItem('inbag', index)}
                    index={index}
                    width="1"
                  />
                </div>
              ))}
            <ArrayButtonAdd
              label="Add a new storage location"
              onClick={() => addArrayItem('inbag', [initialInbag])}
            />
          </div>
          <hr />
          <TextInputStd
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
          <h3 className="h6">Categorise/Security (all optional)</h3>
          <small
            id="categoryhelp"
            className="form-text text-muted form-control-help mb-3"
          >
            You can add activity names, personal tags and security numbers to
            your kit. Enter names separate by commas. (e.g. football, cycling)
          </small>
          <TextInputStd
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <TextInputStd
            label="Tags"
            value={values.tags}
            field="tags"
            handleChange={handleChange}
            error={errors.tags}
          />
          <TextInputStd
            label="Security"
            value={values.security}
            field="security"
            handleChange={handleChange}
            error={errors.security}
          />
          <CheckboxForm
            colFormat="3-1-8"
            label="Active"
            value={values.active}
            field="active"
            onChange={handleChange}
            error={errors.active}
            help="This item is automatically switched off when state is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search."
          />
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
            <Link
              className="button is-primary is-outlined"
              to={`/kitbag/kit/${kitbagId}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitForm);
