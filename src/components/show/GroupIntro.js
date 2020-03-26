import React from 'react';
import GroupIntroTrades from './GroupIntroTrades';
import GroupIntroRecycles from './GroupIntroRecycles';
import GroupIntroStolens from './GroupIntroStolens';
import GroupIntroWanteds from './GroupIntroWanteds';
import Alert from '../includes/Alert';
import SignUpForm from '../auth/SignUpForm';

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
        <div className="card p-3 mx-3 my-5">
          <blockquote className="blockquote mb-0 card-body">
            <p>
              I thoroughly recommend given YouthKitbag a go for trading all your
              club gear and accessories.
            </p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                recommendation made by{' '}
                <cite title="Source Title">
                  Phil Moir (YouthKitbag developer)
                </cite>
              </small>
            </footer>
          </blockquote>
        </div>
        <p className="f-md mb-2">
          <em>This group describes itself as</em>
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
        <div className="bg-dark text-white p-5 mx-3 my-5 rounded-lg">
          <h3 className="pb-3 text-center">
            What are you waiting for? Come and join!
          </h3>
          <p className="pb-3 text-center">
            After you sign up and log in, make sure you request to join{' '}
            {group.name}
          </p>
          <Alert />
          <SignUpForm />
        </div>
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
