import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { createKitbag, editKitbag } from '../../actions/KitbagActions';
import {
  TextForm,
  TextAreaForm,
  ImagesForm,
  RemoveArrayButtonForm,
} from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';
import { getImages } from '../../utils/image';

const mapStateToProps = (state) => ({
  userBundle: state.user.bundle,
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  createKitbag,
  editKitbag,
};

const KitbagForm = ({
  kitbag,
  userBundle,
  newErrors,
  createKitbag,
  editKitbag,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [hasKitbagAdmin, setHasKitbagAdmin] = useState(false);

  const initialValues = {
    ...kitbag,
    images: getImages(kitbag.images),
    kitbagAdmin: true,
  };

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
  } = useForm(initialValues, updateKitbag, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (kitbag) {
      kitbag.images = getImages(kitbag.images);
      kitbag.topImage =
        kitbag.images && kitbag.images.filter((i) => i.state !== 'D').length > 0
          ? kitbag.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(kitbag);
    }
  }, [kitbag, setValues]);

  function updateKitbag() {
    if (values._id) {
      editKitbag(values._id, values);
    } else {
      createKitbag(values);
    }
  }

  useEffect(() => {
    if (values) {
      const newKitbag = !values._id;
      const admin =
        (values.kitbagAdmin && values.state !== 'blocked') || values.appAdmin;
      setIsDisabled(!newKitbag && !admin);
    }
  }, [values, setIsDisabled]);

  useEffect(() => {
    if (userBundle && userBundle.max && userBundle.size) {
      setHasKitbagAdmin(
        userBundle.max.kitbagAdmins > userBundle.size.kitbagAdmins
      );
    }
  }, [userBundle, setHasKitbagAdmin]);

  function showSaveCancelButtons() {
    if (!userBundle || !values) return null;

    return (
      <div>
        {((!values._id && hasKitbagAdmin) || !isDisabled) && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
        <Link className="btn btn-link" to="/settings/kitbags">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      <ImagesForm
        values={values}
        disabled={isDisabled}
        setChange={setChange}
        addArrayItem={addArrayItem}
        error={errors.images}
      />
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <form className="mb-3" onSubmit={handleSubmit}>
          <TextForm
            colFormat="3-9"
            label="Name"
            value={values.name}
            field="name"
            disabled={isDisabled}
            handleChange={handleChange}
            error={errors.name}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Description"
            value={values.description}
            field="description"
            disabled={isDisabled}
            handleChange={handleChange}
            error={errors.description}
          />
          <hr />
          {values.members && values.members.length > 0 && (
            <>
              <div>
                {values.members.map((item, index) => (
                  <div className="form-row" key={index}>
                    <TextForm
                      colFormat="a-4"
                      value={
                        values.members[index].user
                          ? values.members[index].user.email
                          : values.members[index].email
                      }
                      label="Email"
                      field={`members[${index}].user.email`}
                      disabled={true}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-2"
                      value={
                        values.members[index].user
                          ? values.members[index].user.userName
                          : ''
                      }
                      label="Username"
                      field={`members[${index}].user.userName`}
                      disabled={true}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-3"
                      value={values.members[index].roles}
                      label="Roles"
                      field={`members[${index}].roles`}
                      handleChange={handleChange}
                      disabled={isDisabled}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-2"
                      value={values.members[index].state}
                      label="State"
                      field={`members[${index}].state`}
                      handleChange={handleChange}
                      disabled={isDisabled}
                      index={index}
                    />
                    <RemoveArrayButtonForm
                      colFormat="a-1"
                      title="Remove Member"
                      onClick={() => removeArrayItem('members', index)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}
          {!isDisabled && (
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
          )}
          {showSaveCancelButtons()}
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagForm);
