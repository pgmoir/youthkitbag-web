import React from 'react';
import useForm from '../hooks/useForm';
import { signup } from '../../actions/AuthActions';
import validate from './SignUpFormValidationRules';
import { useDispatch } from 'react-redux';
import { TextForm } from '../includes/forms';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    resetSubmit,
    validate
  );

  function resetSubmit() {
    const { email, password, confirmPassword } = values;
    dispatch(signup(email, password, confirmPassword));
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
      />
      <TextForm
        colFormat="3-9"
        label="Password"
        type="password"
        value={values.password}
        field="password"
        handleChange={handleChange}
        error={errors.password}
      />
      <TextForm
        colFormat="3-9"
        label="Confirm"
        type="confirmPassword"
        value={values.confirmPassword}
        field="password"
        handleChange={handleChange}
        error={errors.confirmPassword}
      />
      <button className="btn btn-success btn-lg py-3 px-5 mt-3" type="submit">
        Sign Up for YouthKitbag
      </button>
      <p className="h6 pt-3">
        Alternatively use <a href={`${baseUrl}/auth/google`}>Google</a>,{' '}
        <a href={`${baseUrl}/auth/facebook`}>Facebook</a>
        {' or '}
        <a href={`${baseUrl}/auth/github`}>GitHub</a>
      </p>
    </form>
  );
};

export default SignUpForm;
