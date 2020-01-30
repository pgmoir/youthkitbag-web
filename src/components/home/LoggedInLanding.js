import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user
});

const LoggedInLanding = ({ user }) => {
  function getDisplayName() {
    if (
      !user ||
      !user.profile ||
      (!user.profile.username && !user.profile.firstname)
    )
      return '';
    return user.profile.username
      ? user.profile.username
      : user.profile.firstname;
  }

  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title={`Welcome ${getDisplayName()} to YouthKitbag`} />
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Profile to update</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                et sodales mauris. Cras semper blandit nisl, quis lacinia felis
                cursus nec. Nulla libero ipsum, viverra vitae mauris vel,
                porttitor pellentesque Nullam a scelerisque urna. Mauris risus
                lectus, egestas sit amet diam sit amet, porttitor elementum
                neque. Phasellus volutpat nisi et elit venenatis ultricies. Sed
                vel molestie metus.
              </p>
              <p>
                Fusce iaculis lorem in ornare rhoncus. Nunc sed ullamcorper mi,
                at euismod eros. Pellentesque tristique hendrerit dapibus. Sed
                ac risus id metus augue. Sed viverra mollis luctus. Nullam
                aliquet turpis a velit lobortis cursus.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <h3>New market items</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                et sodales mauris. Cras semper blandit nisl, quis lacinia felis
                cursus nec. Nulla libero ipsum, viverra vitae mauris vel,
                porttitor pellentesque Nullam a scelerisque urna. Mauris risus
                lectus, egestas sit amet diam sit amet, porttitor elementum
                neque. Phasellus volutpat nisi et elit venenatis ultricies. Sed
                vel molestie metus.
              </p>
              <p>
                Fusce iaculis lorem in ornare rhoncus. Nunc sed ullamcorper mi,
                at euismod eros. Pellentesque tristique hendrerit dapibus. Sed
                ac risus id metus augue. Sed viverra mollis luctus. Nullam
                aliquet turpis a velit lobortis cursus.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <h3>New kit items</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                et sodales mauris. Cras semper blandit nisl, quis lacinia felis
                cursus nec. Nulla libero ipsum, viverra vitae mauris vel,
                porttitor pellentesque Nullam a scelerisque urna. Mauris risus
                lectus, egestas sit amet diam sit amet, porttitor elementum
                neque. Phasellus volutpat nisi et elit venenatis ultricies. Sed
                vel molestie metus.
              </p>
              <p>
                Fusce iaculis lorem in ornare rhoncus. Nunc sed ullamcorper mi,
                at euismod eros. Pellentesque tristique hendrerit dapibus. Sed
                ac risus id metus augue. Sed viverra mollis luctus. Nullam
                aliquet turpis a velit lobortis cursus.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <h3>Group Approvals</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                et sodales mauris. Cras semper blandit nisl, quis lacinia felis
                cursus nec. Nulla libero ipsum, viverra vitae mauris vel,
                porttitor pellentesque Nullam a scelerisque urna. Mauris risus
                lectus, egestas sit amet diam sit amet, porttitor elementum
                neque. Phasellus volutpat nisi et elit venenatis ultricies. Sed
                vel molestie metus.
              </p>
              <p>
                Fusce iaculis lorem in ornare rhoncus. Nunc sed ullamcorper mi,
                at euismod eros. Pellentesque tristique hendrerit dapibus. Sed
                ac risus id metus augue. Sed viverra mollis luctus. Nullam
                aliquet turpis a velit lobortis cursus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, null)(LoggedInLanding);
