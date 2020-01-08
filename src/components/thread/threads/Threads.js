import React from 'react';
import ThreadLink from '../threadlink/ThreadLink';
import ThreadMessageChain from '../threadMessageChain/ThreadMessageChain';
import { compareForSameDate } from '../../../helpers/date';

class Threads extends React.Component {
  state = {
    threadDisplayed: undefined
  };

  componentDidMount = () => {
    this.setState({
      threadDisplayed:
        this.props.threads.length > 0 ? this.props.threads[0]._id : undefined
    });
  };

  renderThreadLinks() {
    let { threads, source } = this.props;
    if (!threads) return (threads = [{}, {}, {}, {}, {}, {}]);
    return threads.map((thread, index) => {
      return (
        <ThreadLink
          key={`${thread._id}-${index}`}
          thread={thread}
          source={source}
          changeThreadDisplayed={this.changeThreadDisplayed}
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

  changeThreadDisplayed = id => {
    this.setState({ threadDisplayed: id });
  };

  renderThreadMessages() {
    let threads = [...this.props.threads];
    return threads.map((thread, index) => {
      const thisThread = this.parseThread(thread);
      return (
        <ThreadMessageChain
          key={`${thisThread._id}-${index}`}
          thread={thisThread}
          source={this.props.source}
          accountId={this.props.accountId}
          marketType={this.props.marketType}
          displayed={this.state.threadDisplayed}
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
