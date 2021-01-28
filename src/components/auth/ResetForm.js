import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { reset } from '../../actions/AuthActions';
import validate from '../includes/FormEmptyValidationRules';
import Alert from '../includes/Alert';
import TextInputStd from '../includes/controls/TextInputStd';

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
      <Alert />
      <form onSubmit={handleSubmit}>
        <TextInputStd
          type="email"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
          autoComplete="userName email"
        />
        <button className="button is-large is-primary" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
