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

  renderBlankMessages() {
    return null;
    // const blankMessageChains = [{}, {}, {}, {}, {}, {}];
    // return blankMessageChains.map((thread, index) => {
    //   return (
    //     <ThreadMessageChain
    //       key={`${thread._id}-${index}`}
    //       thread={thread}
    //       source={this.props.source}
    //     />
    //   );
    // });
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

  renderThreadMessages() {
    let items = [...this.props.threads];
    return items.map((thread, index) => {
      return (
        <ThreadMessageChain
          key={`${thread._id}-${index}`}
          thread={thread}
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
