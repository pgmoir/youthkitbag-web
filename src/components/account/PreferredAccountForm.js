import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usePreferredAccountForm from '../hooks/usePreferredAccountForm';
import { editProfilePreferredAccount } from '../../actions/UserActions';

const PreferredAccountForm = ({ userId, accounts }) => {
  const dispatch = useDispatch();
  const {
    setPreferred,
    handleSubmit,
    values,
    setValues
  } = usePreferredAccountForm(accounts, updatePreferredAccount);

  useEffect(() => {
    console.log('USEEFFECT', accounts);
    if (accounts) {
      console.log('USEEFFECT-INSIDE', accounts);
      setValues(accounts);
    }
  }, [accounts, setValues]);

  function updatePreferredAccount() {
    console.log('UPDATEBEF', accounts);
    accounts = undefined;
    console.log('UPDATEAFT', accounts);
    const accountId = values.find(a => a.preferred)._id;
    dispatch(editProfilePreferredAccount(userId, accountId));
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
                  <td>{item.name}</td>
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
            <Link className="btn btn-link" to="/settings/account">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferredAccountForm;
