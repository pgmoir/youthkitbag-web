import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagKit,
  editKitbagKit
} from '../../../actions/KitbagKitActions';
import validate from './KitFormValidationRules';
import {
  DateForm,
  TextForm,
  TextAutoListForm,
  TextAreaForm,
  SelectForm,
  AddArrayButtonForm,
  RemoveArrayButtonForm,
  CheckboxForm,
  ImagesForm
} from '../../includes/forms';

const mapDispatchToProps = {
  createKitbagKit,
  editKitbagKit
};

const mapStateToProps = state => ({
  newErrors: state.toast.errors,
  purchasesfrom: state.kitbag.kit.purchasesfrom
});

const KitForm = ({
  accountId,
  kit,
  createKitbagKit,
  editKitbagKit,
  newErrors,
  purchasesfrom
}) => {
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
    'Other'
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
    setErrors
  } = useForm(kit, updateKit, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (kit) {
      kit.topImage =
        kit.images && kit.images.filter(i => i.state !== 'D').length > 0
          ? kit.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(kit);
    }
  }, [kit, setValues]);

  function updateKit() {
    if (values._id) {
      editKitbagKit(accountId, values._id, values);
    } else {
      createKitbagKit(accountId, values);
    }
  }

  return (
    <div className="row">
      <ImagesForm
        accountId={accountId}
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
          <SelectForm
            colFormat="3-9"
            label="Status"
            value={values.status}
            field="status"
            handleChange={handleChange}
            error={errors.status}
            items={statusItems}
            useItem={false}
          />
          <hr />
          <div>
            {values.purchases &&
              values.purchases.map((item, index) => (
                <div className="form-row" key={index}>
                  <TextAutoListForm
                    colFormat="a-3"
                    value={values.purchases[index].from}
                    label="Purchased from"
                    field={`purchases[${index}].from`}
                    handleChange={handleChange}
                    index={index}
                    autoList={purchasesfrom}
                  />
                  {/* <SelectForm
                    colFormat="a-3"
                    label="Purchased from"
                    value={values.purchases[index].from}
                    field={`purchases[${index}].from`}
                    handleChange={handleChange}
                    items={purchasesfrom}
                    index={index}
                    useItem={true}
                  /> */}
                  <TextForm
                    colFormat="a-2"
                    type="number"
                    value={values.purchases[index].quantity}
                    label="Quantity"
                    field={`purchases[${index}].quantity`}
                    step="1"
                    min="0"
                    max="9999"
                    handleChange={handleChange}
                    index={index}
                  />
                  <DateForm
                    colFormat="a-4"
                    value={values.purchases[index].ondate}
                    label="On"
                    field={`purchases[${index}].ondate`}
                    setChange={setChange}
                    index={index}
                  />
                  <TextForm
                    colFormat="a-2"
                    type="number"
                    value={values.purchases[index].price}
                    label="Price"
                    field={`purchases[${index}].price`}
                    step=".01"
                    min="0.00"
                    max="99999.99"
                    handleChange={handleChange}
                    index={index}
                  />
                  <RemoveArrayButtonForm
                    colFormat="a-1"
                    title="Remove Purchase"
                    onClick={() => removeArrayItem('purchases', index)}
                    index={index}
                  />
                </div>
              ))}
            <AddArrayButtonForm
              label="Add a new purchase"
              onClick={() => addArrayItem('purchases', [initialPurchase])}
            />
          </div>
          <hr />
          <div>
            {values.inbag &&
              values.inbag.map((item, index) => (
                <div className="form-row" key={index}>
                  <TextForm
                    colFormat="a-4"
                    value={values.inbag[index].location}
                    label="Storage location"
                    field={`inbag[${index}].location`}
                    handleChange={handleChange}
                    index={index}
                  />
                  <SelectForm
                    colFormat="a-4"
                    label="Condition"
                    value={values.inbag[index].condition}
                    field={`inbag[${index}].condition`}
                    handleChange={handleChange}
                    items={conditionItems}
                    index={index}
                    useItem={false}
                  />
                  <TextForm
                    colFormat="a-3"
                    type="number"
                    value={values.inbag[index].quantity}
                    label="Quantity"
                    field={`inbag[${index}].quantity`}
                    step="1"
                    min="0"
                    max="9999"
                    handleChange={handleChange}
                    index={index}
                  />
                  <RemoveArrayButtonForm
                    colFormat="a-1"
                    title="Remove Inbag"
                    onClick={() => removeArrayItem('inbag', index)}
                    index={index}
                  />
                </div>
              ))}
            <AddArrayButtonForm
              label="Add a new storage location"
              onClick={() => addArrayItem('inbag', [initialInbag])}
            />
          </div>
          <hr />
          <TextForm
            colFormat="3-9"
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
          <TextForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <TextForm
            colFormat="3-9"
            label="Tags"
            value={values.tags}
            field="tags"
            handleChange={handleChange}
            error={errors.tags}
          />
          <TextForm
            colFormat="3-9"
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
            help="This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search."
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
          <div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <Link className="btn btn-link" to={`/kitbag/kit/${accountId}`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitForm);
