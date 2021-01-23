import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { login } from '../../actions/AuthActions';
import { TextForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';
import TextInputStd from '../includes/controls/TextInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  login,
};

const LoginForm = ({ referrer, newErrors, login }) => {
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, handleChange, handleSubmit, errors, setErrors } = useForm(
    initialValues,
    loginSubmit,
    validate
  );

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function loginSubmit() {
    login(values.email, values.password, referrer);
  }

  return (
    <>
      <div className="mb-3">
        <div className="row mb-3 mx-0">
          <a
            className="btn btn-lg p-3 btn-block btn-google"
            href={`${baseUrl}/auth/google?referrer=${referrer}`}
          >
            Login with Google
          </a>
        </div>
        <div className="row mb-3 mx-0">
          <a
            className="btn btn-lg p-3 btn-block btn-facebook"
            href={`${baseUrl}/auth/facebook?referrer=${referrer}`}
          >
            Login with Facebook
          </a>
        </div>
        <div className="row mb-3 mx-0">
          <a
            className="btn btn-lg p-3 btn-block btn-github"
            href={`${baseUrl}/auth/github?referrer=${referrer}`}
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
        <TextInputStd
          type="email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          autoComplete="userName email"
          placeHolder="Email"
          iconLeft="fas fa-envelope"
        />
        <TextInputStd
          type="password"
          value={values.password}
          field="password"
          handleChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeHolder="Password"
          iconLeft="fas fa-lock"
        />
        <button className="button is-success" type="submit">
          Login to YouthKitbag
        </button>
      </form>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
