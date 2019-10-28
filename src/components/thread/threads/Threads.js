import React from 'react';
import ThreadLink from '../threadlink/ThreadLink';
import ThreadMessageChain from '../threadMessageChain/ThreadMessageChain';

class Threads extends React.Component {
  renderBlank() {
    return <div className="bg-light hgt-3 mb-3">&nbsp;</div>;
  }

  renderBlankLinks() {
    const blankLinks = [{}, {}, {}, {}, {}, {}];
    return blankLinks.map((thread, index) => {
      return (
        <ThreadLink
          key={`${thread._id}-${index}`}
          thread={thread}
          source={this.props.source}
        />
      );
    });
  }

  renderThreadLinks() {
    if (!this.props.threads) return this.renderBlankLinks();
    let items = [...this.props.threads];
    if (items.length < 10) {
      for (var i = items.length; i < 1; i++) {
        items.push({});
      }
    }
    return items.map((thread, index) => {
      return (
        <ThreadLink
          key={`${thread._id}-${index}`}
          thread={thread}
          source={this.props.source}
        />
      );
    });
  }

  cleanThread(thread) {
    let newThread = { ...thread };
    newThread.messages = [];
    const { messages } = thread;
    let previoudsDate = { day: 0, month: 0, year: 0 };
    for (var i = 0; i < messages.length; i++) {
      const sentOnDate = new Date(messages[i].sentOn);
      const compareDate = {
        day: sentOnDate.getDate(),
        month: sentOnDate.getMonth(),
        year: sentOnDate.getFullYear()
      };
      const sameDate =
        previoudsDate.day === compareDate.day &&
        previoudsDate.month === compareDate.month &&
        previoudsDate.year === compareDate.year;
      previoudsDate = compareDate;
      newThread.messages.push({
        _id: messages[i]._id,
        toSourceUser: messages[i].toSourceUser,
        sentOn: sameDate ? undefined : messages[i].sentOn,
        content: messages[i].content
      });
    }
    return newThread;
  }

  renderThreadMessages() {
    let threads = [...this.props.threads];
    return threads.map((thread, index) => {
      const thisThread = this.cleanThread(thread);
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
    if (!this.props.threads) return this.renderBlank();

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
