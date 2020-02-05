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
                <th scope="col"></th>
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
                  <td className="valign-m mw-2rem">
                    <Link to={`/accounts/${item._id}`}>
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].imageUrl
                            : '/images/defaultthumb.png'
                        }
                        className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                        alt=""
                      />
                    </Link>
                  </td>
                  <td className="valign-m">
                    <Link to={`/accounts/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="valign-m">{item.member.state}</td>
                  <td className="valign-m">
                    {item.member.permissions.join(', ')}
                  </td>
                  <td className="valign-m text-center">
                    <input
                      className=""
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
