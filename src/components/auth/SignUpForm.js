import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { signup } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import validate from '../includes/FormEmptyValidationRules';
import TextInputStd from '../includes/controls/TextInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  signup,
};

const SignUpForm = ({ newErrors, signup }) => {
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, handleChange, handleSubmit, errors, setErrors } = useForm(
    initialValues,
    resetSubmit,
    validate
  );

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function resetSubmit() {
    signup(values);
  }

  return (
    <div className="notification has-background-primary-light box">
      <form onSubmit={handleSubmit}>
        <TextInputStd
          value={values.firstName}
          field="firstName"
          handleChange={handleChange}
          error={errors.firstName}
          placeHolder="Enter your First Name"
          iconLeft="fas fa-user"
        />
        <TextInputStd
          value={values.lastName}
          field="lastName"
          handleChange={handleChange}
          error={errors.lastName}
          placeHolder="Enter your Last Name"
          iconLeft="fas fa-user-plus"
        />
        <TextInputStd
          value={values.userName}
          field="userName"
          handleChange={handleChange}
          error={errors.userName}
          autoComplete="userName"
          placeHolder="User NameSpecify a unique User Name"
          iconLeft="fas fa-user-circle"
        />
        <TextInputStd
          type="email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          placeHolder="Enter your Email Address"
          iconLeft="fas fa-envelope"
        />
        <TextInputStd
          type="password"
          value={values.password}
          field="password"
          handleChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeHolder="Create your password"
          iconLeft="fas fa-lock"
        />
        <TextInputStd
          type="password"
          value={values.confirmPassword}
          field="confirmPassword"
          handleChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeHolder="Confirm your password"
          iconLeft="fas fa-passport"
        />
        <button
          className="button is-large is-fullwidth is-primary"
          type="submit"
        >
          Sign Up for YouthKitbag
        </button>
        {/* <p className="h6 pt-3 has-text-centered">
        Alternatively use <a href={`${baseUrl}/auth/google`}>Google</a>,{' '}
        <a href={`${baseUrl}/auth/facebook`}>Facebook</a>
        {' or '}
        <a href={`${baseUrl}/auth/github`}>GitHub</a>
      </p> */}
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
