import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShowGroup } from '../../actions/ShowActions';
import GroupIntro from './GroupIntro';
import ShowTitle from './ShowTitle';

const mapStateToProps = state => ({
  current: state.show.group
});

const mapDispatchToProps = {
  fetchShowGroup
};

const ShowGroupPage = ({ current, fetchShowGroup, match }) => {
  const { groupId } = match.params;
  const [group, setGroup] = useState({});

  useEffect(() => {
    if (groupId) {
      fetchShowGroup(groupId);
    }
  }, [fetchShowGroup, groupId]);

  useEffect(() => {
    if (current && current._id) {
      setGroup({
        ...current
      });
    }
  }, [current]);

  return (
    <div>
      <ShowTitle group={group} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <GroupIntro group={group} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGroupPage);
