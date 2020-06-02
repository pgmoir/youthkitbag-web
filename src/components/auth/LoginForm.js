import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { login } from '../../actions/AuthActions';
import { TextForm } from '../includes/forms';
import validate from '../includes/FormEmptyValidationRules';

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
    <React.Fragment>
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
        <TextForm
          colFormat="3-9"
          type="email"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          autoComplete="username email"
        />
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
          Login to YouthKitbag
        </button>
      </form>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
