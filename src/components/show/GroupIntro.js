import React from 'react';
import GroupIntroMarkets from './GroupIntroMarkets';
import Alert from '../includes/Alert';
import SignUpForm from '../auth/SignUpForm';

const GroupIntro = ({
  group,
  trades,
  recycles,
  founds,
  losts,
  stolens,
  wanteds,
}) => {
  if (!group._id) return null;

  const foundloststolens = {
    items: [],
    totalItems: 0,
  };

  if (founds && founds.totalItems > 0) {
    foundloststolens.items = [...foundloststolens.items, ...founds.items];
    foundloststolens.totalItems += founds.totalItems;
  }

  if (losts && losts.totalItems > 0) {
    foundloststolens.items = [...foundloststolens.items, ...losts.items];
    foundloststolens.totalItems += losts.totalItems;
  }

  if (stolens && stolens.totalItems > 0) {
    foundloststolens.items = [...foundloststolens.items, ...stolens.items];
    foundloststolens.totalItems += stolens.totalItems;
  }

  return (
    <div className="row" role="main">
      <div className="col-12 col-md-6 pr-2">
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
        <div className="card p-3 mr-3 my-3">
          <blockquote className="blockquote mb-0 card-body">
            {!group.recommendation && (
              <p>
                I thoroughly recommend giving YouthKitbag a go for trading all
                your club gear and accessories.
              </p>
            )}
            {group.recommendation && <p>{group.recommendation}</p>}
            <footer className="blockquote-footer">
              <small className="text-muted">
                recommendation made by{' '}
                <cite title="Source Title">
                  {!group.recommendationBy && (
                    <>Phil Moir (YouthKitbag developer)</>
                  )}
                  {group.recommendationBy && <>{group.recommendationBy}</>}
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
        <div className="bg-dark text-white p-5 mr-3 my-3 rounded-lg">
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

      <div className="col-12 col-md-6">
        <GroupIntroMarkets type="recycle" markets={recycles} />
        <GroupIntroMarkets type="trade" markets={trades} />
        <GroupIntroMarkets type="foundloststolen" markets={foundloststolens} />
        <GroupIntroMarkets type="wanted" markets={wanteds} />
      </div>
    </div>
  );
};

export default GroupIntro;
