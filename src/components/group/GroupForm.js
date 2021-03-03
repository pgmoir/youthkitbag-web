import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { createGroup, editGroup } from '../../actions/GroupActions';
import { ImagesForm } from '../includes/images';
import { connect } from 'react-redux';
import validate from '../includes/FormEmptyValidationRules';
import { getFirstImageExcludeDeleted, getImages } from '../../utils/image';
import TextInput from '../includes/controls/TextInput';
import TextAreaInput from '../includes/controls/TextAreaInput';
import TextInputButton from '../includes/controls/TextInputButton';
import customAxios from '../../utils/axios';
import YkbMap from '../includes/maps/YkbMap';

const mapStateToProps = (state) => ({
  userBundle: state.user.bundle,
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  createGroup,
  editGroup,
};

const GroupForm = ({
  group,
  userBundle,
  newErrors,
  createGroup,
  editGroup,
}) => {
  const [showMap, setShowMap] = useState(false);
  const initialValues = { ...group, images: getImages(group.images) };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors,
    setErrors,
  } = useForm(initialValues, updateGroup, validate);

  const showGroupUrl = `${window.location
    .toString()
    .replace('/groups/', '/show/group/')}`;

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (group) {
      group.images = getImages(group.images);
      group.topImage = getFirstImageExcludeDeleted({ images: group.images });
      setValues(group);
    }
  }, [group, setValues]);

  function updateGroup() {
    const formValues = {
      ...values,
      activitys: Array.isArray(values.activitys)
        ? values.activitys
        : values.activitys.split(','),
    };
    if (values._id) {
      editGroup(values._id, formValues);
    } else {
      createGroup(formValues);
    }
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
      .get(`/address/search/${values.address}`)
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
            label="Name"
            value={values.name}
            field="name"
            handleChange={handleChange}
            error={errors.name}
          />
          <TextAreaInput
            label="Description"
            value={values.description}
            field="description"
            handleChange={handleChange}
            error={errors.description}
          />
          <TextInputButton
            label="Address"
            value={values.address}
            field="address"
            handleChange={handleChange}
            error={errors.address}
            placeHolder="e.g. Woodford Green IG8 7DQ"
            buttonText="Search"
            handleButtonClick={(e) => handleAddressSearch(e)}
            description="Search address or postcode to set location on map"
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
          )}
          <TextInput
            type="email"
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
          <TextInput
            label="Website"
            value={values.website}
            field="website"
            handleChange={handleChange}
            error={errors.website}
          />
          <TextInput
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <TextAreaInput
            label="Recommendation"
            value={values.recommendation}
            field="recommendation"
            rows="3"
            handleChange={handleChange}
            error={errors.recommendation}
          />
          <TextInput
            label="Recommendation by"
            value={values.recommendationBy}
            field="recommendationBy"
            handleChange={handleChange}
            error={errors.recommendationBy}
          />
          {group._id && (
            <>
              <h2 className="h5">
                Copy and share the link below to promote this group
              </h2>
              <p>
                <a
                  href={showGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {showGroupUrl}
                </a>
                <span
                  className="fas fa-external-link-alt pl-2"
                  title="Link will open a new tab"
                ></span>
              </p>
            </>
          )}
          {userBundle && values && (
            <>
              <hr />
              <div className="buttons">
                <button className="button is-primary" type="submit">
                  Save
                </button>
                <Link className="button is-warning" to="/groups">
                  Cancel
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
