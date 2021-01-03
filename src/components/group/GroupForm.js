import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { createGroup, editGroup } from '../../actions/GroupActions';
import { TextForm, TextAreaForm, ImagesForm } from '../includes/forms';
import { connect } from 'react-redux';
import validate from '../includes/FormEmptyValidationRules';
import { getImages } from '../../utils/image';

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
      group.topImage =
        group.images && group.images.filter((i) => i.state !== 'D').length > 0
          ? group.images.filter((i) => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(group);
    }
  }, [group, setValues]);

  function updateGroup() {
    if (values._id) {
      editGroup(values._id, values);
    } else {
      createGroup(values);
    }
  }

  function showSaveCancelButtons() {
    if (!userBundle || !values) return null;

    return (
      <div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <Link className="btn btn-link" to="/groups">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      <ImagesForm
        values={values}
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
            handleChange={handleChange}
            error={errors.name}
          />
          <TextForm
            colFormat="3-9"
            label="Tagline"
            value={values.tagline}
            field="tagline"
            handleChange={handleChange}
            error={errors.tagline}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Description"
            value={values.description}
            field="description"
            handleChange={handleChange}
            error={errors.description}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Recommendation"
            value={values.recommendation}
            field="recommendation"
            rows="3"
            handleChange={handleChange}
            error={errors.recommendation}
          />
          <TextForm
            colFormat="3-9"
            label="Recommendation by"
            value={values.recommendationBy}
            field="recommendationBy"
            handleChange={handleChange}
            error={errors.recommendationBy}
          />
          <TextForm
            colFormat="3-9"
            type="email"
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
          <TextForm
            colFormat="3-9"
            label="Website"
            value={values.website}
            field="website"
            handleChange={handleChange}
            error={errors.website}
          />
          <hr />
          <TextAreaForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            rows="2"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <hr />
          <h2 className="h5">
            Copy and share the link below to promote this group
          </h2>
          <p>
            <a href={showGroupUrl} target="_blank" rel="noopener noreferrer">
              {showGroupUrl}
            </a>
            <span
              className="fas fa-external-link-alt pl-2"
              title="Link will open a new tab"
            ></span>
          </p>
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
          {showSaveCancelButtons()}
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
