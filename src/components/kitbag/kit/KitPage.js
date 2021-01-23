import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import KitForm from './KitForm';
import Title from '../../includes/title/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = (state) => ({
  current: state.kitbag.kit.current,
});

const mapDispatchToProps = {
  fetchKitbagKit,
};

const KitPage = ({ current, fetchKitbagKit, match }) => {
  const { kitId, kitbagId } = match.params;
  const [kit, setKit] = useState({
    title: '',
    subtitle: '',
    description: '',
    status: 'Owned',
    purchases: [],
    inbag: [],
    security: [],
    warning: 0,
    activitys: [],
    tags: '',
    active: true,
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0,
  });

  useEffect(() => {
    if (kitbagId && kitId) {
      fetchKitbagKit(kitbagId, kitId);
    }
  }, [fetchKitbagKit, kitbagId, kitId]);

  useEffect(() => {
    if (current && current._id) {
      const newKit = {
        ...current,
        imagesToUpload: 0,
      };
      setKit(newKit);
    }
  }, [current]);

  function itemIsLoding() {
    return kitId && !kit._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return kit._id ? `${kit.title}` : 'Create new kit';
  }

  return (
    <div>
      <Title title={getTitle()} />
      <Alert />
      {kitId && (
        <div className="buttons">
          <Link
            to={`/kitbag/market/${kitbagId}/add/${kitId}/trade`}
            className="button"
          >
            Trade Recycle
          </Link>
          <Link
            to={`/kitbag/market/${kitbagId}/add/${kitId}/wanted`}
            className="button"
          >
            Wanted
          </Link>
          <Link
            to={`/kitbag/market/${kitbagId}/add/${kitId}/stolen`}
            className="button"
          >
            Found Lost Stolen
          </Link>
        </div>
      )}
      <KitForm kitbagId={kitbagId} kit={kit} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitPage);
