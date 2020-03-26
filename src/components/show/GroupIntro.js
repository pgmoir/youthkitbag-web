import React from 'react';
import GroupIntroTrades from './GroupIntroTrades';
import GroupIntroRecycles from './GroupIntroRecycles';
import GroupIntroStolens from './GroupIntroStolens';
import GroupIntroWanteds from './GroupIntroWanteds';

const GroupIntro = ({ group, trades, recycles, stolens, wanteds }) => {
  if (!group._id) return null;

  return (
    <div className="row" role="main">
      <div className="col-12 col-sm-6 pr-2">
        <p className="f-lg">
          {group.status === 'approved' && (
            <>
              <a href={group.website}>
                <em>{group.name}</em>
              </a>{' '}
              has been approved as an official group on YouthKitbag, and
              currently has{' '}
              <span className={`badge badge-pill badge-dark`}>
                {group.memberCount}
              </span>{' '}
              active members.
            </>
          )}
          {group.status === 'requested' && (
            <>
              <em>{group.name}</em> has been registered as an official group on
              YouthKitbag, and is currently awaiting approval to accept member
              registrations.
            </>
          )}
        </p>
        <p className="f-md mb-2">
          <em>It describes itself as</em>
        </p>
        <p className="">{group.description}</p>
        <p className="f-md mb-2">
          <em>And lists the activitys it supports as:</em>
        </p>
        <ul>
          {group.activitys.map((m, i) => {
            return <li key={i}>{m}</li>;
          })}
        </ul>
      </div>

      <div className="col-12 col-sm-6">
        <GroupIntroRecycles recycles={recycles} />
        <GroupIntroTrades trades={trades} />
        <GroupIntroStolens stolens={stolens} />
        <GroupIntroWanteds wanteds={wanteds} />
      </div>
    </div>
  );
};

export default GroupIntro;
