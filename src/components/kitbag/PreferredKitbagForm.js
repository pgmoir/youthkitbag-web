import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePreferredKitbagForm from '../hooks/usePreferredKitbagForm';
import {
  editPreferredKitbag,
  loadSettingsPage,
} from '../../actions/UserActions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  editPreferredKitbag,
  loadSettingsPage,
};

const PreferredKitbagForm = ({
  userId,
  kitbags,
  editPreferredKitbag,
  loadSettingsPage,
}) => {
  const {
    setPreferred,
    handleSubmit,
    values,
    setValues,
  } = usePreferredKitbagForm(kitbags, updatePreferredKitbag);

  useEffect(() => {
    if (kitbags) {
      setValues(kitbags);
    }
  }, [kitbags, setValues]);

  function updatePreferredKitbag() {
    kitbags = undefined;
    const kitbagId = values.find((a) => a.preferred)._id;
    editPreferredKitbag(userId, kitbagId);
  }

  function cancelPage() {
    loadSettingsPage('/settings/kitbags');
  }

  return (
    <div className="row">
      <div className="col-12">
        <h5>Kitbag Membership</h5>
        <form className="mb-3" onSubmit={handleSubmit}>
          <table className="table bg-light">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Kitbag</th>
                <th scope="col">State</th>
                <th scope="col">Roles</th>
                <th scope="col" className="text-center">
                  Preferred
                </th>
              </tr>
            </thead>
            <tbody>
              {kitbags.map((item, index) => (
                <tr key={index}>
                  <td className="valign-m mw-3rem">
                    <Link to={`/kitbags/${item._id}`}>
                      <figure className="image is-48x48 is-square">
                        <img
                          src={
                            item.images && item.images.length > 0
                              ? item.images[0].imageUrl
                              : '/images/defaultthumb.png'
                          }
                          className="is-rounded"
                          alt=""
                        />
                      </figure>
                    </Link>
                  </td>
                  <td className="valign-m">
                    <Link to={`/kitbags/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="valign-m">{item.member.state}</td>
                  <td className="valign-m">{item.member.roles.join(', ')}</td>
                  <td className="valign-m text-center">
                    <input
                      className=""
                      type="radio"
                      name="KitbagPreference"
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
          <div className="buttons">
            <button className="button is-primary" type="submit">
              Save
            </button>
            <button className="button is-link" onClick={() => cancelPage()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(PreferredKitbagForm);
