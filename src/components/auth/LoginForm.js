import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { login } from '../../actions/AuthActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  login,
};

const LoginForm = ({ referrer, newErrors, login, email }) => {
  const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

  const initialValues = {
    email: email || '',
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
    <div className="notification has-background-primary-light box">
      <Title title="Login with" hasHr={false} />
      <Alert />
      <div className="buttons">
        <a
          className="button is-large is-fullwidth"
          href={`${baseUrl}/auth/google?referrer=${referrer}`}
        >
          <span className="icon button-oauth google"></span>
          <span>Google</span>
        </a>
        <a
          className="button is-large is-fullwidth"
          href={`${baseUrl}/auth/facebook?referrer=${referrer}`}
        >
          <span className="icon is-medium button-oauth facebook"></span>
          <span>Facebook</span>
        </a>
        <a
          className="button is-large is-fullwidth"
          href={`${baseUrl}/auth/github?referrer=${referrer}`}
        >
          <span className="icon is-medium button-oauth github"></span>
          <span>GitHub</span>
        </a>
      </div>
      <p className="mb-3 has-text-centered">
        <span className="centre-line"></span>
        or
        <span className="centre-line"></span>
      </p>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          autoComplete="email"
          placeHolder="Enter your email"
          iconLeft="fas fa-envelope"
        />
        <TextInput
          type="password"
          value={values.password}
          field="password"
          handleChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeHolder="Enter your password"
          iconLeft="fas fa-lock"
        />
        <button
          className="button is-large is-fullwidth is-success"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="content mt-5">
        <p className="has-text-centered">
          If you don&apos;t have an account,{' '}
          <Link to="/auth/signup">then sign up for a new account</Link>. Or for
          the forgetful, <Link to="/auth/reset">then reset your password</Link>.
        </p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
