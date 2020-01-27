import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { createAccount, editAccount } from '../../actions/AccountActions';
import validate from './AccountFormValidationRules';
import {
  TextForm,
  TextAreaForm,
  ImagesForm,
  RemoveArrayButtonForm
} from '../includes/forms';

const mapDispatchToProps = {
  createAccount,
  editAccount
};

const mapStateToProps = state => ({
  newErrors: state.toast.errors,
  userPackage: state.user.package
});

const AccountForm = ({
  account,
  createAccount,
  editAccount,
  newErrors,
  userPackage
}) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [hasAccountAdmin, setHasAccountAdmin] = useState(false);

  const initialValues = { ...account, accountAdmin: true, exists: false };

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
  } = useForm(initialValues, updateAccount, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (account) {
      account.topImage =
        account.images && account.images.filter(i => i.state !== 'D').length > 0
          ? account.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(account);
    }
  }, [account, setValues]);

  function updateAccount() {
    if (values._id) {
      editAccount(values._id, values);
    } else {
      createAccount(values);
    }
  }

  useEffect(() => {
    if (values) {
      const newAccount = !values._id;
      const admin =
        (values.accountAdmin && values.status !== 'blocked') || values.appAdmin;
      setIsReadOnly(!newAccount && !admin);
    }
  }, [values, setIsReadOnly]);

  useEffect(() => {
    if (userPackage && userPackage.max && userPackage.size) {
      setHasAccountAdmin(
        userPackage.max.accountadmins > userPackage.size.accountadmins
      );
    }
  }, [userPackage, setHasAccountAdmin]);

  function showSaveCancelButtons() {
    if (!userPackage || !values) return null;

    return (
      <div>
        {((!values._id && hasAccountAdmin) || !isReadOnly) && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
        <Link className="btn btn-link" to="/settings/accounts">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      <ImagesForm
        values={values}
        readOnly={isReadOnly}
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
            readOnly={isReadOnly}
            handleChange={handleChange}
            error={errors.name}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Description"
            value={values.description}
            field="description"
            readOnly={isReadOnly}
            handleChange={handleChange}
            error={errors.description}
          />
          <hr />
          {values.members && values.members.length > 0 && (
            <React.Fragment>
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
                      readOnly={true}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-2"
                      value={
                        values.members[index].user
                          ? values.members[index].user.profile.username
                          : ''
                      }
                      label="Username"
                      field={`members[${index}].user.profile.username`}
                      readOnly={true}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-3"
                      value={values.members[index].permissions}
                      label="Permissions"
                      field={`members[${index}].permissions`}
                      handleChange={handleChange}
                      readOnly={isReadOnly}
                      index={index}
                    />
                    <TextForm
                      colFormat="a-2"
                      value={values.members[index].state}
                      label="State"
                      field={`members[${index}].state`}
                      handleChange={handleChange}
                      readOnly={isReadOnly}
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
            </React.Fragment>
          )}
          {!isReadOnly && (
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
