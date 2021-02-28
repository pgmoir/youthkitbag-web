import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePreferredKitbagForm from '../hooks/usePreferredKitbagForm';
import {
  editPreferredKitbag,
  loadSettingsPage,
} from '../../actions/UserActions';
import { connect } from 'react-redux';
import { getImage } from '../../utils/image';
import { MemberStates } from '../../enums/memberStates.enum';
import { requestToJoinKitbag } from '../../actions';

const mapDispatchToProps = {
  editPreferredKitbag,
  loadSettingsPage,
  requestToJoinKitbag,
};

const PreferredKitbagForm = ({
  kitbags,
  editPreferredKitbag,
  loadSettingsPage,
  requestToJoinKitbag,
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
    editPreferredKitbag({ kitbagId });
  }

  function acceptInviteToKitbag(e, kitbagId) {
    e.stopPropagation();
    requestToJoinKitbag({ kitbagId });
  }

  function cancelPage() {
    loadSettingsPage('/settings/kitbags');
  }

  return (
    <div>
      <h5>Kitbag Membership</h5>
      <form className="mb-3" onSubmit={handleSubmit}>
        <table className="table bg-light is-fullwidth">
          <thead>
            <tr>
              <th className="is-4"></th>
              <th>Kitbag</th>
              <th className="is-hidden-mobile">State</th>
              <th className="is-hidden-mobile">Role</th>
              <th>Preferred</th>
            </tr>
          </thead>
          <tbody>
            {kitbags.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.member.state === MemberStates.APPROVED ? (
                    <Link to={`/kitbags/${item._id}`}>
                      <figure className="image is-1by1">
                        <img
                          src={getImage({ images: item.images, index: 0 })}
                          className="is-rounded"
                          alt=""
                        />
                      </figure>
                    </Link>
                  ) : (
                    <figure className="image is-1by1">
                      <img
                        src={getImage({ images: item.images, index: 0 })}
                        className="is-rounded"
                        alt=""
                      />
                    </figure>
                  )}
                </td>
                <td className="is-vcentered">
                  {item.member.state === MemberStates.APPROVED ? (
                    <Link
                      className="has-text-primary a11y-highlight"
                      to={`/kitbags/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>{item.name}</>
                  )}
                </td>
                <td className="is-hidden-mobile is-vcentered">
                  {item.member.state}
                </td>
                <td className="is-hidden-mobile is-vcentered">
                  {item.member.role}
                </td>
                <td className="is-vcentered">
                  {item.member.state === MemberStates.APPROVED && (
                    <input
                      className="is-radio-large"
                      type="radio"
                      name="KitbagPreference"
                      id={item._id}
                      value={values[index].preferred}
                      onChange={setPreferred}
                      checked={values[index].preferred === true}
                    />
                  )}
                  {item.member.state === MemberStates.INVITED && (
                    <div
                      onClick={(e) => acceptInviteToKitbag(e, item._id)}
                      onKeyPress={(e) => acceptInviteToKitbag(e, item._id)}
                      className="button is-success"
                      role="button"
                      tabIndex="0"
                    >
                      Click to Accept Invite
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {kitbags.filter(
          (kitbag) => kitbag.member.state === MemberStates.APPROVED
        ).length > 0 && (
          <div className="buttons">
            <button className="button is-primary" type="submit">
              Save
            </button>
            <button className="button is-warning" onClick={() => cancelPage()}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(PreferredKitbagForm);
