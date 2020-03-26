import React from 'react';

const GroupIntro = ({ group }) => {
  if (!group._id) return null;

  return (
    <div className="row" role="main">
      <div className="col-12 col-sm-6">
        <p className="f-lg">
          {group.status === 'approved' && (
            <>
              <a href={group.website}>
                <em>{group.name}</em>
              </a>{' '}
              has been approved as an official group on YouthKitbag, and
              currently has{' '}
              <span className={`badge badge-pill badge-dark`}>
                {group.memberCount}{' '}
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
        <p className="f-md">
          <em>It describes itself as</em>
          <br />
          &#34;{group.description}&#34;
        </p>
        <p className="f-md">
          <em>And lists the activitys it supports as:</em>
          <br />
          {/* {group.activitys.join(', ')} */}
          <ul>
            {group.activitys.map((m, i) => {
              return <li key={i}>{m}</li>;
            })}
          </ul>
        </p>
      </div>
      <div className="col-12 col-sm-6">
        <h2 className="h4">Current trades</h2>
        <p className="f-md">This will show current trades</p>
        <h2 className="h4">Current recycling</h2>
        <p className="f-md">Free trade items will show current trades</p>
      </div>
    </div>
  );
};

export default GroupIntro;
