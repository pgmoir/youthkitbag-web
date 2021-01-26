import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbag, clearKitbag } from '../../actions/KitbagActions';
import KitbagForm from './KitbagForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import KitbagsHelp from '../kitbag/KitbagsHelp';

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
    const leftState = kitbag.kitbagMemberState === 'left' ? ' (left)' : '';
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

  return (
    <div className="container">
      <Title title={getTitle()} />

      {renderNoKitbagIntro()}
      <Alert />
      <div className="columns">
        <div className="column is-fullwidth">
          <div className="buttons is-justify-content-flex-end">
            {kitbagId && kitbag.kitbagAdmin && kitbag.state !== 'blocked' && (
              <Link
                to={`/kitbags/${kitbagId}/invite`}
                className="button is-info"
              >
                Invite
              </Link>
            )}
            {kitbagId &&
              !kitbag.kitbagAdmin &&
              kitbag.state !== 'blocked' &&
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagPage);
