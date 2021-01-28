import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import {
  fetchWorkspace,
  inviteToWorkspace,
} from '../../actions/WorkspaceActions';
import ModalWithForm from '../includes/ModalWithForm';
import validate from '../includes/FormEmptyValidationRules';
import TextInputStd from '../includes/controls/TextInputStd';
import SelectInputStd from '../includes/controls/SelectInputStd';

const mapStateToProps = (state) => ({
  workspace: state.workspace.current,
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  fetchWorkspace,
  inviteToWorkspace,
};

const WorkspaceMemberInvite = ({
  workspace,
  newErrors,
  fetchWorkspace,
  inviteToWorkspace,
  match,
}) => {
  const workspaceId = match.params.workspaceId;
  const initialValues = { email: '', roles: '' };
  const history = useHistory();
  const hasAdmin =
    workspace._id && workspace.workspaceMemberRoles.includes('admin');

  const rolesItems = hasAdmin
    ? ['', 'admin', 'member', 'customer', 'professional']
    : ['', 'member', 'customer', 'professional'];

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    initialValues,
    sendInvite,
    validate
  );

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace(workspaceId);
    }
  }, [fetchWorkspace, workspaceId]);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function sendInvite() {
    if (values.email) {
      //TODO: fix roles array
      const formValues = { ...values, roles: values.roles.split(',') };
      inviteToWorkspace(workspaceId, formValues);
      history.push(`/workspace/${workspaceId}/members`);
    }
  }

  function renderTitle() {
    if (!workspace) {
      return 'Invite to workspace';
    }
    return `Invite to "${workspace.name}"`;
  }

  function renderContent() {
    if (!workspace) {
      return 'Invite option not available.';
    }
    return (
      <>
        <p>
          Enter an email and specify roles for a person you want to give access
          to this workspace
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
        />{' '}
      </>
    );
  }

  function renderActions() {
    return (
      <div className="buttons">
        <Link
          to={`/workspace/${workspaceId}/members`}
          className="button is-warning"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button type="submit" className="button is-primary">
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
      onDismiss={() => history.push(`/workspace/${workspaceId}/members`)}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceMemberInvite);
