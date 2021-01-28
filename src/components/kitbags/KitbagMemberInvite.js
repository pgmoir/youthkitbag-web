import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { fetchKitbag, inviteToKitbag } from '../../actions/KitbagActions';
import ModalWithForm from '../includes/ModalWithForm';
import validate from '../includes/FormEmptyValidationRules';
import TextInputStd from '../includes/controls/TextInputStd';
import SelectInputStd from '../includes/controls/SelectInputStd';

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
        <TextInputStd
          label="Email"
          value={values.email}
          field="email"
          handleChange={handleChange}
          error={errors.email}
        />
        <SelectInputStd
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
      <div className="buttons">
        <Link
          to={`/kitbags/${kitbagId}`}
          className="button is-warning"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button type="submit" className="button is-success">
          Invite to Join
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
      onDismiss={() => history.push(`/kitbags/${kitbagId}`)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagMemberInvite);
