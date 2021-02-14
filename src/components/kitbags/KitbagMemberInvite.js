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

// const mapStateToProps = (state) => ({
//   kitbag: state.kitbag.kitbags.current,
//   newErrors: state.toast.errors,
// });

const mapDispatchToProps = {
  inviteToKitbag,
};

const KitbagMemberInvite = ({ kitbag, modalIsActive, setModalIsActive }) => {
  function closeModal() {
    setModalIsActive(false);
  }

  const { name } = kitbag;
  // const kitbagId = match.params.kitbagId;
  const initialValues = { email: '', roles: '' };

  const rolesItems = ['', 'admin', 'member'];

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    initialValues,
    sendInvite,
    validate
  );

  // useEffect(() => {
  //   if (kitbagId) {
  //     fetchKitbag(kitbagId);
  //   }
  // }, [fetchKitbag, kitbagId]);

  // useEffect(() => {
  //   if (newErrors) {
  //     setErrors(newErrors);
  //   }
  // }, [newErrors, setErrors]);

  function sendInvite() {
    if (values.email) {
      const formValues = { ...values, roles: values.roles.split(',') };
      inviteToKitbag(kitbag._id, formValues);
      //      history.push(`/kitbag/${kitbagId}/members`);
    }
  }

  // function renderTitle() {
  //   if (!kitbag) {
  //     return 'Invite to kitbag';
  //   }
  //   return `Invite to "${kitbag.name}"`;
  // }

  // function renderContent() {
  //   if (!kitbag) {
  //     return 'Invite option not available.';
  //   }
  //   return (
  //     <>
  //       <p>
  //         Enter an email and specify roles for a person you want to give access
  //         to this kitbag
  //       </p>
  //       <TextInputStd
  //         label="Email"
  //         value={values.email}
  //         field="email"
  //         handleChange={handleChange}
  //         error={errors.email}
  //       />
  //       <SelectInputStd
  //         label="Roles"
  //         value={values.roles}
  //         field="roles"
  //         handleChange={handleChange}
  //         error={errors.roles}
  //         items={rolesItems}
  //         useItem={false}
  //       />
  //     </>
  //   );
  // }

  // function renderActions() {
  //   return (
  //     <div className="buttons">
  //       <Link
  //         to={`/kitbags/${kitbagId}`}
  //         className="button is-warning"
  //         data-dismiss="modal"
  //       >
  //         Cancel
  //       </Link>
  //       <button type="submit" className="button is-success">
  //         Invite to Join
  //       </button>
  //     </div>
  //   );
  // }

  // return (
  //   <ModalWithForm
  //     title={renderTitle()}
  //     content={renderContent()}
  //     actions={renderActions()}
  //     handleSubmit={handleSubmit}
  //     onDismiss={() => history.push(`/kitbags/${kitbagId}`)}
  //   />
  // );
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
          <p className="modal-card-title">{`Invite to ${name}`}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
            tabIndex="0"
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="is-size-6 mb-3">
            Enter an email and select the role for the person you want to invite
            to this kitbag
          </p>
          <TextInputStd
            label="Email"
            value={values.email}
            field="email"
            handleChange={handleChange}
            error={errors.email}
          />
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={async () => {
              setModalIsActive(false);
            }}
          >
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
