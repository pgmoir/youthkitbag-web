import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import KitForm from './KitForm';
import Title from '../../includes/title/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.kitbag.kit.current
});

const mapDispatchToProps = {
  fetchKitbagKit
};

const KitPage = ({ current, fetchKitbagKit, match }) => {
  const kitId = match.params.kitId;
  const [kit, setKit] = useState({
    title: '',
    subtitle: '',
    description: '',
    status: 'owned',
    purchases: [],
    inbag: [],
    security: [],
    warning: 0,
    activitys: [],
    tags: '',
    active: true,
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (kitId) {
      fetchKitbagKit(kitId);
    }
  }, [fetchKitbagKit, kitId]);

  useEffect(() => {
    if (current && current._id) {
      const newKit = {
        ...current,
        imagesToUpload: 0
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

    return kit._id ? `Kit: ${kit.title}` : 'Create new kit';
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          {kitId && (
            <div className="row">
              <div className="col-12 mb-3 d-flex justify-content-end">
                <Link
                  to={`/kitbag/market/add/${kitId}/trade`}
                  className="btn btn-primary mr-3"
                >
                  Trade
                </Link>
                <Link
                  to={`/kitbag/market/add/${kitId}/wanted`}
                  className="btn btn-secondary mr-3"
                >
                  Wanted
                </Link>
                <Link
                  to={`/kitbag/market/add/${kitId}/stolen`}
                  className="btn btn-danger"
                >
                  Stolen
                </Link>
              </div>
            </div>
          )}
          <KitForm kit={kit} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KitPage);
