import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { checkNewPassword, setNewPassword } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state) => ({
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
  const navigate = useNavigate();
  const initialValues = {
    password: '',
    userId
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
    navigate('/auth/login');
  }

  return (
    <div className="notification has-background-primary-light box">
      <Title title="Set a new password" hasHr={false} />
      <Alert />
      <div className="content">
        <p>
          You have requested a password reset. The token supplied is currently
          valid, and you should enter a new password here.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="password"
          value={values.password}
          field="password"
          handleChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeHolder="Enter your new password"
          iconLeft="fas fa-lock"
        />
        <input name="userId" type="hidden" value={values.userId} />
        <button
          className="button is-large is-fullwidth is-success"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm);
