import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { createKitbag, editKitbag } from '../../actions/KitbagActions';
import { ImagesForm } from '../includes/images';
import validate from '../includes/FormEmptyValidationRules';
import { getFirstImageExcludeDeleted, getImages } from '../../utils/image';
import TextInput from '../includes/controls/TextInput';
import TextAreaInput from '../includes/controls/TextAreaInput';
import KitbagMember from './KitbagMember';

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
  inviteMember,
}) => {
  const userId = useSelector((state) => state.user?._id);

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
    if (kitbag._id) {
      kitbag.images = getImages(kitbag.images);
      kitbag.topImage = getFirstImageExcludeDeleted({ images: kitbag.images });
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

  function showSaveCancelButtons() {
    if (!userBundle || !values) return null;

    return (
      <div className="buttons">
        {values.kitbagAdmin && (
          <button className="button is-primary" type="submit">
            Save
          </button>
        )}
        <Link className="button is-warning" to="/settings/kitbags">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div className="columns mb-3">
      <div className="column">
        <ImagesForm
          values={values}
          disabled={!values.kitbagAdmin}
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
            disabled={!values.kitbagAdmin}
            handleChange={handleChange}
            error={errors.name}
          />
          <TextAreaInput
            label="Description"
            value={values.description}
            field="description"
            disabled={!values.kitbagAdmin}
            handleChange={handleChange}
            error={errors.description}
          />
          <hr />
          {values.kitbagAdmin && kitbag?._id && (
            <div>
              <p className="has-text-weight-bold mb-3">
                Members (Email, Role, State)
              </p>
              {values.members &&
                values.members.map((item, index) => (
                  <div key={index}>
                    <KitbagMember
                      kitbag={kitbag}
                      values={values}
                      index={index}
                      handleChange={handleChange}
                      errors={errors}
                      userId={userId}
                    />
                  </div>
                ))}
              <div className="buttons">
                <button
                  className="button is-info"
                  type="button"
                  onClick={(e) => {
                    inviteMember(e);
                  }}
                  onKeyPress={(e) => {
                    inviteMember(e);
                  }}
                >
                  Invite Member
                </button>
              </div>
              <hr className="mt-0" />
            </div>
          )}
          {showSaveCancelButtons()}
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagForm);
