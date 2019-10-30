import React from 'react';
import ThreadLink from '../threadlink/ThreadLink';
import ThreadMessageChain from '../threadMessageChain/ThreadMessageChain';
import { compareForSameDate } from '../../../helpers/date';

class Threads extends React.Component {
  renderThreadLinks() {
    let { threads, source } = this.props;
    if (!threads) return (threads = [{}, {}, {}, {}, {}, {}]);
    return threads.map((thread, index) => {
      return (
        <ThreadLink
          key={`${thread._id}-${index}`}
          thread={thread}
          source={source}
        />
      );
    });
  }

  parseThread(thread) {
    let newThread = { ...thread };
    newThread.messages = [];
    const { messages } = thread;
    let previousDate;
    for (var i = 0; i < messages.length; i++) {
      const { sourceDate, newPreviousDate } = compareForSameDate(
        messages[i].sentOn,
        previousDate
      );
      previousDate = newPreviousDate;
      newThread.messages.push({
        _id: messages[i]._id,
        toSourceUser: messages[i].toSourceUser,
        sentOn: sourceDate,
        content: messages[i].content
      });
    }
    return newThread;
  }

  renderThreadMessages() {
    let threads = [...this.props.threads];
    return threads.map((thread, index) => {
      const thisThread = this.parseThread(thread);
      return (
        <ThreadMessageChain
          key={`${thisThread._id}-${index}`}
          thread={thisThread}
          source={this.props.source}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row pb-3">
          <div className="col-4">{this.renderThreadLinks()}</div>
          <div className="col-8">{this.renderThreadMessages()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Threads;
