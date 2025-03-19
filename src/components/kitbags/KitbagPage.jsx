import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchKitbag, clearKitbag } from '../../actions/KitbagActions';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import KitbagForm from './KitbagForm';
import KitbagsHelp from '../kitbag/KitbagsHelp';
import Title from '../includes/title/Title';
import KitbagMemberInvite from './KitbagMemberInvite';
import { MemberStates } from '../../enums/memberStates.enum';
import { ImageUrls } from '../../enums/imageUrls.enum';
import { useParams } from 'react-router-dom';

const mapStateToProps = (state) => ({
  current: state.kitbag.kitbags.current,
  kitbags: state.user.kitbags
});

const mapDispatchToProps = {
  fetchKitbag,
  clearKitbag
};

const KitbagPage = ({ current, kitbags, fetchKitbag, clearKitbag }) => {
  const { kitbagId } = useParams();
  const [modalIsActive, setModalIsActive] = useState(false);
  const [kitbag, setKitbag] = useState({
    name: '',
    description: '',
    images: [],
    members: [],
    topImage: ImageUrls.DEFAULT,
    imagesToUpload: 0
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
        imagesToUpload: 0
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
    { title: getTitle() }
  ];

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title title={getTitle()} />
      <div className="container">
        {renderNoKitbagIntro()}
        <Alert />
        <KitbagForm kitbag={kitbag} inviteMember={inviteMember} />
      </div>
      <KitbagMemberInvite
        kitbagId={kitbag._id}
        kitbagName={kitbag.name}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagPage);
