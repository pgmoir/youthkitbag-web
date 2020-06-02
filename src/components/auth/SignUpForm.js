import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { signup } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import { TextForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  signup,
};

const SignUpForm = ({ newErrors, signup }) => {
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
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
    const { email, password, confirmPassword } = values;
    signup(email, password, confirmPassword);
  }

  return (
    <form className="w-100 d-block" onSubmit={handleSubmit}>
      <TextForm
        colFormat="3-9"
        label="Email"
        type="email"
        value={values.email}
        field="email"
        handleChange={handleChange}
        error={errors.email}
        autoComplete="username"
      />
      <TextForm
        colFormat="3-9"
        label="Password"
        type="password"
        value={values.password}
        field="password"
        handleChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <TextForm
        colFormat="3-9"
        label="Confirm"
        type="password"
        value={values.confirmPassword}
        field="confirmPassword"
        handleChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />
      <button
        className="d-block btn btn-success btn-lg py-3 px-5 mt-3 mx-auto"
        type="submit"
      >
        Sign Up for YouthKitbag
      </button>
      <p className="h6 pt-3 text-center">
        Alternatively use <a href={`${baseUrl}/auth/google`}>Google</a>,{' '}
        <a href={`${baseUrl}/auth/facebook`}>Facebook</a>
        {' or '}
        <a href={`${baseUrl}/auth/github`}>GitHub</a>
      </p>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
