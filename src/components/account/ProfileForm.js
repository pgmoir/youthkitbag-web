import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { editProfile, loadSettingsPage } from '../../actions/UserActions';
import { TextForm, ImagesForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = state => ({
  newErrors: state.toast.errors
});

const mapDispatchToProps = { editProfile, loadSettingsPage };

const ProfileForm = ({ profile, newErrors, editProfile, loadSettingsPage }) => {
  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(profile, updateProfile, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (profile) {
      profile.topImage =
        profile.images && profile.images.filter(i => i.state !== 'D').length > 0
          ? profile.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(profile);
    }
  }, [profile, setValues]);

  function updateProfile() {
    editProfile(values._id, values);
  }

  function cancelPage() {
    loadSettingsPage('/settings/profile');
  }

  return (
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
            label="Last Name"
            value={values.lastname}
            field="lastname"
            handleChange={handleChange}
            error={errors.lastname}
          />
          <TextForm
            colFormat="3-9"
            label="First Name"
            value={values.firstname}
            field="firstname"
            handleChange={handleChange}
            error={errors.firstname}
          />
          <TextForm
            colFormat="3-9"
            label="Username"
            value={values.username}
            field="username"
            handleChange={handleChange}
            error={errors.username}
          />
          <TextForm
            colFormat="3-9"
            label="Location"
            value={values.location}
            field="location"
            handleChange={handleChange}
            error={errors.location}
          />
          <hr />
          <TextForm
            colFormat="3-9"
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
          <div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-link" onClick={() => cancelPage()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
