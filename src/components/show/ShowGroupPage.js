import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchShowGroup,
  fetchShowGroupMarket,
} from '../../actions/ShowActions';
import GroupIntro from './GroupIntro';
import ShowTitle from './ShowTitle';
import { MarketTypes } from '../../enums/marketTypes.enum';

const mapStateToProps = (state) => ({
  current: state.show.group,
  trades: state.show.trades,
  recycles: state.show.recycles,
  founds: state.show.founds,
  losts: state.show.losts,
  stolens: state.show.stolens,
  wanteds: state.show.wanteds,
});

const mapDispatchToProps = {
  fetchShowGroup,
  fetchShowGroupMarket,
};

const ShowGroupPage = ({
  current,
  trades,
  recycles,
  founds,
  losts,
  stolens,
  wanteds,
  fetchShowGroup,
  fetchShowGroupMarket,
  match,
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
      fetchShowGroupMarket(groupId, MarketTypes.TRADE);
      fetchShowGroupMarket(groupId, MarketTypes.RECYCLE);
      fetchShowGroupMarket(groupId, MarketTypes.FOUND);
      fetchShowGroupMarket(groupId, MarketTypes.LOST);
      fetchShowGroupMarket(groupId, MarketTypes.STOLEN);
      fetchShowGroupMarket(groupId, MarketTypes.WANTED);
    }
  }, [fetchShowGroupMarket, groupId]);

  useEffect(() => {
    if (current && current._id) {
      setGroup({
        ...current,
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
            founds={founds}
            losts={losts}
            stolens={stolens}
            wanteds={wanteds}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGroupPage);
