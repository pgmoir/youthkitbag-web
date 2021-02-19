import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import Title from '../includes/title/Title';
import { reset } from '../../actions/AuthActions';
import validate from '../includes/FormEmptyValidationRules';
import Alert from '../includes/Alert';
import TextInput from '../includes/controls/TextInput';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  reset,
};

const ResetForm = ({ newErrors, reset }) => {
  const initialValues = {
    email: '',
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
    reset(values.email);
  }

  return (
    <div className="notification has-background-primary-light box">
      <Title title="Reset your password" hasHr={false} />
      <Alert />
      <div className="content">
        <p>
          If you have forgotten your password, then enter your email here and
          you will be sent a link to create a new password. Please be aware that
          this link is time limited, and will expire in an hour after sending.
          If actually you know you&apos;re password,{' '}
          <Link to="/auth/login">login direct to your kitbag</Link>.
        </p>
      </div>
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

        <button
          className="button is-large is-fullwidth is-success"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
