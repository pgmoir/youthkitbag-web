import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchKitbag, clearKitbag } from '../../actions/KitbagActions';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import KitbagForm from './KitbagForm';
import KitbagsHelp from '../kitbag/KitbagsHelp';
import Title from '../includes/title/Title';
import KitbagMemberInvite from './KitbagMemberInvite';
import { MemberStates } from '../../enums/memberStates.enum';
import { KitbagStates } from '../../enums/kitbagStates.enum';

const mapStateToProps = (state) => ({
  current: state.kitbag.kitbags.current,
  kitbags: state.user.kitbags,
});

const mapDispatchToProps = {
  fetchKitbag,
  clearKitbag,
};

const KitbagPage = ({ current, kitbags, fetchKitbag, clearKitbag, match }) => {
  const { kitbagId } = match.params;
  const [modalIsActive, setModalIsActive] = useState(false);
  const [kitbag, setKitbag] = useState({
    name: '',
    description: '',
    images: [],
    members: [],
    topImage: '/images/default.png',
    imagesToUpload: 0,
  });

  useEffect(() => {
    if (kitbagId) {
      fetchKitbag(kitbagId);
    }
  }, [fetchKitbag, kitbagId]);

  useEffect(() => {
    if (current && current._id) {
      const newKitbag = {
        ...current,
        imagesToUpload: 0,
      };
      setKitbag(newKitbag);
    }
  }, [current]);

  function kitbagIsLoading() {
    return kitbagId && !kitbag._id;
  }

  function getTitle() {
    if (kitbagIsLoading()) {
      return 'Loading ...';
    }
    const leftState =
      kitbag.kitbagMemberState === MemberStates.LEFT ? ' (left)' : '';
    return kitbag._id ? `${kitbag.name}${leftState}` : 'Create new kitbag';
  }

  function renderNoKitbagIntro() {
    if (!kitbags) return null;
    if (!kitbags || kitbags.length > 0) return null;

    return <KitbagsHelp />;
  }

  useEffect(() => {
    return function clearUp() {
      clearKitbag();
    };
  }, [clearKitbag]);

  function inviteMember(e) {
    e.stopPropagation();
    setModalIsActive(true);
  }

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Personal Settings', to: '/settings' },
    { title: 'Kitbags', to: '/settings/kitbags' },
    { title: getTitle() },
  ];

  return (
    <div className="container">
      <Breadcrumb crumbs={crumbs} />
      <Title title={getTitle()} />
      {renderNoKitbagIntro()}
      <Alert />
      <div className="columns">
        <div className="column is-fullwidth">
          <div className="buttons is-justify-content-flex-end">
            {kitbagId &&
              kitbag.kitbagAdmin &&
              kitbag.state !== KitbagStates.BLOCKED && (
                <div
                  className="button is-info"
                  onClick={(e) => {
                    inviteMember(e);
                  }}
                  onKeyPress={(e) => {
                    inviteMember(e);
                  }}
                  role="button"
                  tabIndex="0"
                >
                  Invite
                </div>
              )}
            {kitbagId &&
              !kitbag.kitbagAdmin &&
              kitbag.state !== KitbagStates.BLOCKED &&
              kitbag.kitbagMember && (
                <Link
                  to={`/kitbags/${kitbagId}/leave`}
                  className="button is-warning"
                >
                  Leave
                </Link>
              )}
          </div>
        </div>
      </div>
      <KitbagForm kitbag={kitbag} />
      <KitbagMemberInvite
        kitbag={kitbag}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagPage);
