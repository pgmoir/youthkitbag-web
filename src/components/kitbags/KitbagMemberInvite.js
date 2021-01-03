import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { fetchKitbag, inviteToKitbag } from '../../actions/KitbagActions';
import { TextForm } from '../includes/forms';
import ModalWithForm from '../includes/ModalWithForm';
import history from '../../utils/history';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = (state) => ({
  kitbag: state.kitbag.current,
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  fetchKitbag,
  inviteToKitbag,
};

const KitbagMemberInvite = ({
  kitbag,
  newErrors,
  fetchKitbag,
  inviteToKitbag,
  match,
}) => {
  const kitbagId = match.params.kitbagId;
  const invite = { email: '' };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    invite,
    sendInvite,
    validate
  );

  useEffect(() => {
    if (kitbagId) {
      fetchKitbag(kitbagId);
    }
  }, [fetchKitbag, kitbagId]);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function sendInvite() {
    if (values.email) {
      inviteToKitbag(kitbagId, values.email);
    }
  }
  function renderTitle() {
    if (!kitbag) {
      return 'Invite to kitbag';
    }
    return `Invite to "${kitbag.name}"`;
  }

  function renderContent() {
    if (!kitbag) {
      return 'Invite option not available.';
    }
    return (
      <React.Fragment>
        <p>
          Enter an email for a person you want to give access to this kitbag
        </p>
        <TextForm
          colFormat="3-9"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
        />
      </React.Fragment>
    );
  }

  function renderActions() {
    return (
      <React.Fragment>
        <Link
          to={`/kitbags/${kitbagId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-success">
          Invite to Join
        </button>
      </React.Fragment>
    );
  }

  return (
    <ModalWithForm
      title={renderTitle()}
      content={renderContent()}
      actions={renderActions()}
      handleSubmit={handleSubmit}
      onDismiss={() => history.push(`/kitbags/${kitbagId}`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagMemberInvite);
