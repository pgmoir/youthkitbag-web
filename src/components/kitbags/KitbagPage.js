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
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          {renderNoKitbagIntro()}
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end">
              {kitbagId && kitbag.kitbagAdmin && kitbag.status !== 'blocked' && (
                <Link
                  to={`/kitbags/${kitbagId}/invite`}
                  className="btn btn-primary"
                >
                  Invite
                </Link>
              )}
              {kitbagId &&
                !kitbag.kitbagAdmin &&
                kitbag.status !== 'blocked' &&
                kitbag.kitbagMember && (
                  <Link
                    to={`/kitbags/${kitbagId}/leave`}
                    className="btn btn-primary ml-3"
                  >
                    Leave
                  </Link>
                )}
            </div>
          </div>
          <KitbagForm kitbag={kitbag} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitbagPage);
