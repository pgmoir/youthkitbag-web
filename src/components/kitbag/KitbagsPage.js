import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PreferredKitbagForm from './PreferredKitbagForm';
import KitbagMemberJoin from '../kitbags/KitbagMemberJoin';

const KitbagsPage = () => {
  const user = useSelector((state) => state.user);
  const [modalIsActive, setModalIsActive] = useState(false);

  function requestToJoinKitbag(e) {
    e.stopPropagation();
    setModalIsActive(true);
  }
  return (
    <>
      <div className="content">
        <p>
          As a user of YouthKitbag, you can create as many kitbags as allowed
          within your chosen bundle limits. The default Star kitbag (free)
          allows you to create 3 kitbags.
        </p>
        <div className="buttons">
          <Link to="/kitbags/new" className="button is-primary">
            Create Kitbag
          </Link>
          <span
            className="button is-info is-clickable"
            onClick={(e) => {
              requestToJoinKitbag(e);
            }}
            onKeyPress={(e) => {
              requestToJoinKitbag(e);
            }}
            role="button"
            tabIndex="0"
          >
            Join Kitbag
          </span>
        </div>
        <p>
          You can then invite others to join your kitbags via email. Those
          invited, will need to create an kitbag, and then accept your invite.
          Once accepted, they will have access to view, update and switch to the
          market any items in the kitbag.
        </p>
        <p>
          If you are a member of multiple kitbags, you can only view one at a
          time. Therefore to switch between kitbags, select the preferred kitbag
          below and click on save to apply the change.
        </p>
      </div>
      {user && user.kitbags && user.kitbags.length > 0 && (
        <PreferredKitbagForm userId={user._id} kitbags={user.kitbags} />
      )}
      <KitbagMemberJoin
        // userId={userId}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export default KitbagsPage;
