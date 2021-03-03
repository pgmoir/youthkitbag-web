import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editUser, loadSettingsPage } from '../../actions/UserActions';
import { ImagesForm } from '../includes/images';
import validate from '../includes/FormEmptyValidationRules';
import { getFirstImageExcludeDeleted, getImages } from '../../utils/image';
import TextInput from '../includes/controls/TextInput';
import TextInputButton from '../includes/controls/TextInputButton';
import customAxios from '../../utils/axios';
import YkbMap from '../includes/maps/YkbMap';

const mapDispatchToProps = { editUser, loadSettingsPage };

const UserForm = ({ user, editUser, loadSettingsPage }) => {
  const [showMap, setShowMap] = useState(false);
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

  function handleAddressSearch(e) {
    e.preventDefault();

    function updateLatLon(lat, lon) {
      setChange('lat', lat);
      setChange('lon', lon);
    }

    function updateAddressError() {
      setErrors({
        ...errors,
        address: 'Address search was unable to find this location',
      });
    }

    customAxios
      .get(`/address/search/${values.postcode}`)
      .then((response) => {
        const { address, status } = response.data.data;
        if (address && status === 'OK') {
          const { lat, lng } = address.location;
          setErrors({});
          updateLatLon(lat, lng);
          setShowMap(true);
        } else {
          updateAddressError();
          setShowMap(false);
        }
      })
      .catch((err) => {
        updateAddressError(err);
      });
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
          <TextInputButton
            label="Postcode"
            value={values.postcode}
            field="postcode"
            handleChange={handleChange}
            error={errors.postcode}
            placeHolder="Only postcode required"
            buttonText="Search"
            handleButtonClick={(e) => handleAddressSearch(e)}
            description="Search postcode to set location on map"
          />
          <button
            type="button"
            className="button is-info is-light mb-4"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
          {showMap && (
            <div className="leaflet-container mb-3">
              <YkbMap id={values._id} position={[values.lat, values.lon]} />
            </div>
          )}{' '}
          <hr />
          <TextInput
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <hr />
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
