import React from 'react';
import useForm from '../hooks/useForm';
import { login } from '../../actions/AuthActions';
import validate from './LoginFormValidationRules';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
    email: '',
    password: ''
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    loginSubmit,
    validate
  );

  function loginSubmit() {
    dispatch(login(values.email, values.password));
  }

  return (
    <React.Fragment>
      <div className="mb-3">
        <div className="row mb-3">
          <a
            className="btn btn-lg p-3 btn-block btn-google"
            href={`${baseUrl}/auth/google`}
          >
            Login with Google
          </a>
        </div>
        <div className="row mb-3">
          <a
            className="btn btn-lg p-3 btn-block btn-facebook"
            href={`${baseUrl}/auth/facebook`}
          >
            Login with Facebook
          </a>
        </div>
        <div className="row mb-3">
          <a
            className="btn btn-lg p-3 btn-block btn-github"
            href={`${baseUrl}/auth/github`}
          >
            Login with GitHub
          </a>
        </div>
      </div>
      <p className="mb-3 text-center">
        <span className="centre-line"></span>
        or
        <span className="centre-line"></span>
      </p>
      <form className="w-100 d-block" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            aria-describedby="email"
            autoComplete="username email"
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            aria-describedby="password"
            autoComplete="current-password"
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
