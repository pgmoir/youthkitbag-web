import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import Alert from '../../includes/Alert';
import Breadcrumb from '../../includes/Breadcrumb';
import KitForm from './KitForm';
import Title from '../../includes/title/Title';
import { ImageUrls } from '../../../enums/imageUrls.enum';

const mapDispatchToProps = {
  fetchKitbagKit,
};

const KitPage = ({ fetchKitbagKit, match }) => {
  const { kitId, kitbagId } = match.params;

  const current = useSelector((state) => {
    return state.kitbag.kit?.entities[kitId];
  });

  const kitbag = useSelector((state) => {
    return state.user.kitbags?.find((kitbag) => kitbag._id === kitbagId);
  });

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
    tags: [],
    active: true,
    images: [],
    topImage: ImageUrls.DEFAULT,
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

  function itemIsLoading() {
    return kitId && !kit._id;
  }

  function getTitle() {
    if (itemIsLoading()) {
      return 'Loading ...';
    }
    return kit._id ? `${kit.title}` : 'Create new kit';
  }

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: `${kitbag?.name}`, to: `/kitbag/kit/${kitbagId}` },
    { title: getTitle() },
  ];

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title title={getTitle()} />
      <div className="container">
        <Alert />
        {kitId && (
          <div className="columns">
            <div className="column is-fullwidth">
              <div className="buttons is-justify-content-flex-end">
                <Link
                  to={`/kitbag/market/${kitbagId}/add/${kitId}/trade`}
                  className="button is-info"
                >
                  Trade Recycle
                </Link>
                <Link
                  to={`/kitbag/market/${kitbagId}/add/${kitId}/wanted`}
                  className="button is-success"
                >
                  Wanted
                </Link>
                <Link
                  to={`/kitbag/market/${kitbagId}/add/${kitId}/stolen`}
                  className="button is-warning"
                >
                  Found Lost Stolen
                </Link>
              </div>
            </div>
          </div>
        )}
        <KitForm kitbagId={kitbagId} kit={kit} />
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(KitPage);
