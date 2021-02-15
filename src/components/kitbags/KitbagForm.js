import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { createKitbag, editKitbag } from '../../actions/KitbagActions';
import { ImagesForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';
import { getImages } from '../../utils/image';
import TextInputStd from '../includes/controls/TextInputStd';
import TextAreaInputStd from '../includes/controls/TextAreaInputStd';
import TextInputCol from '../includes/controls/TextInputCol';
import ArrayButtonRemove from '../includes/controls/ArrayButtonRemove';
import SelectInputCol from '../includes/controls/SelectInputCol';
import { MemberRoles } from '../../enums/memberRoles.enum';
import { MemberStates } from '../../enums/memberStates.enum';

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
      <div className="buttons">
        {((!values._id && hasKitbagAdmin) || !isDisabled) && (
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

  const roleItems = ['', MemberRoles.ADMIN, MemberRoles.MEMBER];
  const stateItems = [
    '',
    MemberStates.INVITED,
    MemberStates.APPROVED,
    MemberStates.BLOCKED,
  ];

  return (
    <div className="columns mb-3">
      <div className="column">
        <ImagesForm
          values={values}
          disabled={isDisabled}
          setChange={setChange}
          addArrayItem={addArrayItem}
          error={errors.images}
        />
      </div>
      <div className="column">
        <form onSubmit={handleSubmit}>
          <TextInputStd
            label="Name"
            value={values.name}
            field="name"
            disabled={isDisabled}
            handleChange={handleChange}
            error={errors.name}
          />
          <TextAreaInputStd
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
                  <div
                    className="columns is-variable is-gapless mx-0 mb-1"
                    key={index}
                  >
                    <TextInputCol
                      value={
                        values.members[index].user
                          ? values.members[index].user.email
                          : values.members[index].email
                      }
                      label="Email"
                      field={`members[${index}].user.email`}
                      disabled={true}
                      index={index}
                      width="5"
                    />
                    <SelectInputCol
                      label="Role"
                      value={values.members[index].role}
                      field={`members[${index}].role`}
                      handleChange={handleChange}
                      error={errors.role}
                      items={roleItems}
                      disabled={isDisabled}
                      index={index}
                      width="3"
                    />
                    <SelectInputCol
                      label="State"
                      value={values.members[index].state}
                      field={`members[${index}].state`}
                      handleChange={handleChange}
                      error={errors.state}
                      items={stateItems}
                      disabled={isDisabled}
                      index={index}
                      width="3"
                    />
                    <ArrayButtonRemove
                      title="Remove Member"
                      onClick={() => removeArrayItem('members', index)}
                      index={index}
                      width="1"
                    />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}
          {showSaveCancelButtons()}
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagForm);
