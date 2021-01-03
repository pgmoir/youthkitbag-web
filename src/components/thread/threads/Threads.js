import React, { useState, useEffect } from 'react';
import ThreadLink from '../threadlink/ThreadLink';
import ThreadMessageChain from '../threadMessageChain/ThreadMessageChain';
import { compareForSameDate } from '../../../utils/date';

const Threads = ({ threads, kitbagId, source, marketType }) => {
  const [threadDisplayed, setThreadDisplayed] = useState();

  useEffect(() => {
    if (threads) {
      setThreadDisplayed(threads.length > 0 ? threads[0]._id : undefined);
    }
  }, [threads, setThreadDisplayed]);

  function parseThread(thread) {
    let newThread = { ...thread };
    newThread.messages = [];
    const { messages } = thread;
    let previousDate;
    for (var i = 0; i < messages.length; i++) {
      const { toSourceKitbag, fromUser, content, sentOn } = messages[i];
      const { sourceDate, newPreviousDate } = compareForSameDate(
        sentOn,
        previousDate
      );
      previousDate = newPreviousDate;
      newThread.messages.push({
        _id: i,
        toSourceKitbag,
        fromUser,
        sentOn: sourceDate,
        content,
      });
    }
    return newThread;
  }

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
      const thisThread = parseThread(thread);
      return (
        <ThreadMessageChain
          key={`${thisThread._id}-${index}`}
          thread={thisThread}
          source={source}
          kitbagId={kitbagId}
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
