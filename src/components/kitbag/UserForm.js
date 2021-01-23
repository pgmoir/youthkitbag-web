import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editUser, loadSettingsPage } from '../../actions/UserActions';
import { ImagesForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';
import { getImages } from '../../utils/image';
import TextInputStd from '../includes/controls/TextInputStd';

const mapDispatchToProps = { editUser, loadSettingsPage };

const UserForm = ({ user, editUser, loadSettingsPage }) => {
  const initialValues = { ...user, images: getImages(user.images) };

  const newErrors = useSelector((state) => state.toast.errors);

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors,
    setErrors,
  } = useForm(initialValues, updateUser, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (user) {
      user.images = getImages(user.images);
      user.topImage =
        user.images && user.images.filter((i) => i.state !== 'D').length > 0
          ? user.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(user);
    }
  }, [user, setValues]);

  function updateUser() {
    const formValues = {
      ...values,
      activitys: Array.isArray(values.activitys)
        ? values.activitys
        : values.activitys.split(','),
    };
    editUser(formValues);
  }

  function cancelPage() {
    loadSettingsPage('/settings/user');
  }

  return (
    <div className="is-flex flex-col-touch flex-row-desktop-reverse">
      <div className="is-flex-grow-1">
        <ImagesForm
          values={values}
          setChange={setChange}
          addArrayItem={addArrayItem}
          error={errors.images}
        />
      </div>
      <div className="is-flex-grow-1 mr-3" role="main">
        <form onSubmit={handleSubmit}>
          <TextInputStd
            label="First Name"
            value={values.firstName}
            field="firstName"
            handleChange={handleChange}
            error={errors.firstName}
          />
          <TextInputStd
            label="Last Name"
            value={values.lastName}
            field="lastName"
            handleChange={handleChange}
            error={errors.lastName}
          />
          <TextInputStd
            label="Email"
            value={values.email}
            field="email"
            readonly={true}
          />
          <TextInputStd
            label="Username"
            value={values.userName}
            field="userName"
            handleChange={handleChange}
            error={errors.userName}
          />
          <hr />
          <TextInputStd
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
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
          <div className="buttons mb-3">
            <button className="button is-primary" type="submit">
              Save
            </button>
            <button
              className="button is-primary is-outlined"
              onClick={() => cancelPage()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(UserForm);
