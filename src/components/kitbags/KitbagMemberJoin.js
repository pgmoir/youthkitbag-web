import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { requestToJoinKitbag } from '../../actions/KitbagActions';
import ModalWithForm from '../includes/ModalWithForm';
import history from '../../utils/history';
import validate from '../includes/FormEmptyValidationRules';
import TextInputStd from '../includes/controls/TextInputStd';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  requestToJoinKitbag,
};

const KitbagMemberJoin = ({ newErrors, requestToJoinKitbag }) => {
  const request = { email: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    request,
    sendRequest,
    validate
  );

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function sendRequest() {
    if (values.email) {
      requestToJoinKitbag(values.email);
    }
  }
  function renderTitle() {
    return 'Request to join kitbag';
  }

  function renderContent() {
    return (
      <>
        <p>
          Enter the email of the person who has the kitbag to which you&apos;d
          like to join.
        </p>
        <TextInputStd
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
        />
      </>
    );
  }

  function renderActions() {
    return (
      <div className="buttons">
        <Link to={`/`} className="button is-warning" data-dismiss="modal">
          Cancel
        </Link>
        <button type="submit" className="button is-success">
          Request to Join
        </button>
      </div>
    );
  }

  return (
    <ModalWithForm
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      handleSubmit={handleSubmit}
      onDismiss={() => history.push(`/`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagMemberJoin);
