import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { fetchKitbag, inviteToKitbag } from '../../actions/KitbagActions';
import { TextForm, SelectForm } from '../includes/forms';
import ModalWithForm from '../includes/ModalWithForm';
import validate from '../includes/FormEmptyValidationRules';

const mapStateToProps = (state) => ({
  kitbag: state.kitbag.kitbags.current,
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
  const initialValues = { email: '', roles: '' };

  const rolesItems = ['', 'admin', 'member'];

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    initialValues,
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
      //TODO: fix roles array
      const formValues = { ...values, roles: values.roles.split(',') };
      inviteToKitbag(kitbagId, formValues);
      //      history.push(`/kitbag/${kitbagId}/members`);
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
      <>
        <p>
          Enter an email and specify roles for a person you want to give access
          to this kitbag
        </p>
        <TextForm
          colFormat="3-9"
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
        />
        <SelectForm
          colFormat="3-9"
          label="Roles"
          value={values.roles}
          field="roles"
          handleChange={handleChange}
          error={errors.roles}
          items={rolesItems}
          useItem={false}
        />
      </>
    );
  }

  function renderActions() {
    return (
      <>
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
      </>
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
