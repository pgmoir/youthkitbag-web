import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchShowGroup,
  fetchShowGroupMarket
} from '../../actions/ShowActions';
import GroupIntro from './GroupIntro';
import ShowTitle from './ShowTitle';

const mapStateToProps = state => ({
  current: state.show.group,
  trades: state.show.trades,
  recycles: state.show.recycles,
  stolens: state.show.stolens,
  wanteds: state.show.wanteds
});

const mapDispatchToProps = {
  fetchShowGroup,
  fetchShowGroupMarket
};

const ShowGroupPage = ({
  current,
  trades,
  recycles,
  stolens,
  wanteds,
  fetchShowGroup,
  fetchShowGroupMarket,
  match
}) => {
  const { groupId } = match.params;
  const [group, setGroup] = useState({});

  useEffect(() => {
    if (groupId) {
      fetchShowGroup(groupId);
    }
  }, [fetchShowGroup, groupId]);

  useEffect(() => {
    if (groupId) {
      fetchShowGroupMarket(groupId, 'trade');
      fetchShowGroupMarket(groupId, 'recycle');
      fetchShowGroupMarket(groupId, 'stolen');
      fetchShowGroupMarket(groupId, 'wanted');
    }
  }, [fetchShowGroupMarket, groupId]);

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
          <GroupIntro
            group={group}
            trades={trades}
            recycles={recycles}
            stolens={stolens}
            wanteds={wanteds}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGroupPage);
