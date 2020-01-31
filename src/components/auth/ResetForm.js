import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { reset } from '../../actions/AuthActions';
import validate from './ResetFormValidationRules';
import { TextForm } from '../includes/forms';

const mapDispatchToProps = {
  reset
};

const mapStateToProps = state => ({
  newErrors: state.toast.errors
});

const ResetForm = ({ reset, newErrors }) => {
  const initialValues = {
    email: ''
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
      <button
        className="d-block btn btn-success btn-lg py-3 px-5 mt-3 mx-auto"
        type="submit"
      >
        Reset Password
      </button>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
