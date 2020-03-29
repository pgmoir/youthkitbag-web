import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { checkNewPassword, setNewPassword } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import { TextForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = state => ({
  userId: state.auth.userId,
  newErrors: state.toast.errors
});

const mapDispatchToProps = {
  checkNewPassword,
  setNewPassword
};

const NewPasswordForm = ({
  userId,
  newErrors,
  checkNewPassword,
  setNewPassword,
  token
}) => {
  const initialValues = {
    password: ''
  };

  const { values, handleChange, handleSubmit, errors, setErrors } = useForm(
    initialValues,
    newPasswordSubmit,
    validate
  );

  useEffect(() => {
    if (token) {
      checkNewPassword(token);
    }
  }, [token, checkNewPassword]);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function newPasswordSubmit() {
    setNewPassword(userId, token, values.password);
  }

  return (
    <form className="w-100 d-block" onSubmit={handleSubmit}>
      <TextForm
        colFormat="3-9"
        type="password"
        label="Password"
        value={values.password}
        field="password"
        handleChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <button
        className="d-block btn btn-success btn-lg py-3 px-5 mt-3 mx-auto"
        type="submit"
      >
        Update Password
      </button>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm);
