import React from 'react';
import { connect } from 'react-redux';

import useForm from '../hooks/useForm';
import { inviteToKitbag } from '../../actions/KitbagActions';
import validate from '../includes/FormEmptyValidationRules';
import TextInput from '../includes/controls/TextInput';
import SelectInput from '../includes/controls/SelectInput';
import { MemberRoles } from '../../enums/memberRoles.enum';

const mapDispatchToProps = {
  inviteToKitbag,
};

const KitbagMemberInvite = ({
  kitbagId,
  kitbagName,
  inviteToKitbag,
  modalIsActive,
  setModalIsActive,
}) => {
  function closeModal() {
    setModalIsActive(false);
  }

  const initialValues = { email: '', role: '' };

  const roleItems = ['', MemberRoles.ADMIN, MemberRoles.MEMBER];

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialValues,
    sendInvite,
    validate
  );

  function sendInvite() {
    const formValues = { ...values };
    inviteToKitbag({ kitbagId, formValues });
    setModalIsActive(false);
  }

  return (
    <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
      <div
        className="modal-background"
        onClick={closeModal}
        onKeyPress={closeModal}
        role="button"
        tabIndex="0"
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Invite to ${kitbagName}`}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6 mb-3">
            Enter the email and role for the person you want to invite to this
            kitbag
          </p>
          <TextInput
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
          <SelectInput
            label="Role"
            value={values.role}
            field="role"
            handleChange={handleChange}
            error={errors.role}
            items={roleItems}
          />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>
            Invite
          </button>
          <button className="button is-warning" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(KitbagMemberInvite);
