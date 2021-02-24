import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editUser, loadSettingsPage } from '../../actions/UserActions';
import { ImagesForm } from '../includes/images';
import validate from '../includes/FormEmptyValidationRules';
import { getFirstImageExcludeDeleted, getImages } from '../../utils/image';
import TextInput from '../includes/controls/TextInput';

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
      user.topImage = getFirstImageExcludeDeleted({ images: user.images });
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
    <div className="columns mb-3">
      <div className="column">
        <ImagesForm
          values={values}
          setChange={setChange}
          addArrayItem={addArrayItem}
          error={errors.images}
        />
      </div>
      <div className="column">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="First Name"
            value={values.firstName}
            field="firstName"
            handleChange={handleChange}
            error={errors.firstName}
          />
          <TextInput
            label="Last Name"
            value={values.lastName}
            field="lastName"
            handleChange={handleChange}
            error={errors.lastName}
          />
          <TextInput
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            addClassName={'is-static'}
          />
          <hr />
          <TextInput
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
            <button className="button is-warning" onClick={() => cancelPage()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(UserForm);
