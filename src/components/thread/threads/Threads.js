import React, { useState, useEffect } from 'react';
import ThreadLink from '../threadlink/ThreadLink';
import ThreadMessageChain from '../threadMessageChain/ThreadMessageChain';

const Threads = ({ threads, accountId, source, marketType }) => {
  const [threadDisplayed, setThreadDisplayed] = useState();

  useEffect(() => {
    if (threads) {
      setThreadDisplayed(threads.length > 0 ? threads[0]._id : undefined);
    }
  }, [threads, setThreadDisplayed]);

  function renderThreadLinks() {
    if (!threads) return (threads = [{}, {}, {}, {}, {}, {}]);
    return threads.map((thread, index) => {
      return (
        <ThreadLink
          key={`${thread._id}-${index}`}
          thread={thread}
          source={source}
          changeThreadDisplayed={changeThreadDisplayed}
        />
      );
    });
  }

  function changeThreadDisplayed(id) {
    setThreadDisplayed(id);
  }

  function renderThreadMessages() {
    return threads.map((thread, index) => {
      return (
        <ThreadMessageChain
          key={`${thread._id}-${index}`}
          thread={thread}
          source={source}
          accountId={accountId}
          marketType={marketType}
          displayed={threadDisplayed}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <div className="row pb-3">
        <div className="col-4">{renderThreadLinks()}</div>
        <div className="col-8">{renderThreadMessages()}</div>
      </div>
    </React.Fragment>
  );
};

export default Threads;
