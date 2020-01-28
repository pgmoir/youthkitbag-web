import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePreferredAccountForm from '../hooks/usePreferredAccountForm';
import {
  editProfilePreferredAccount,
  loadSettingsPage
} from '../../actions/UserActions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  editProfilePreferredAccount,
  loadSettingsPage
};

const PreferredAccountForm = ({
  userId,
  accounts,
  editProfilePreferredAccount,
  loadSettingsPage
}) => {
  const {
    setPreferred,
    handleSubmit,
    values,
    setValues
  } = usePreferredAccountForm(accounts, updatePreferredAccount);

  useEffect(() => {
    if (accounts) {
      setValues(accounts);
    }
  }, [accounts, setValues]);

  function updatePreferredAccount() {
    accounts = undefined;
    const accountId = values.find(a => a.preferred)._id;
    editProfilePreferredAccount(userId, accountId);
  }

  function cancelPage() {
    loadSettingsPage('/settings/accounts');
  }

  return (
    <div className="row">
      <div className="col-12">
        <h5>Account Membership</h5>
        <form className="mb-3" onSubmit={handleSubmit}>
          <table className="table bg-light">
            <thead>
              <tr>
                <th scope="col">Account</th>
                <th scope="col">State</th>
                <th scope="col">Permissions</th>
                <th scope="col" className="text-center">
                  Preferred
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/accounts/${item._id}`}>{item.name}</Link>
                  </td>
                  <td>{item.members[0].state}</td>
                  <td>{item.members[0].permissions.join(', ')}</td>
                  <td className="text-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="AccountPreference"
                      id={item._id}
                      value={values[index].preferred}
                      onChange={setPreferred}
                      checked={values[index].preferred === true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-link" onClick={() => cancelPage()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(PreferredAccountForm);
