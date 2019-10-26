import React from 'react';
import ThreadLink from '../threadlinks/ThreadLink';

class Threads extends React.Component {
  renderBlank() {
    return <div className="bg-light hgt-3 mb-3">&nbsp;</div>;
  }

  renderBlankLinks() {
    const blankLinks = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankLinks.map((item, index) => {
      return <ThreadLink key={`${item._id}-${index}`} kit={item} />;
    });
  }
  renderThreadLinks() {
    if (!this.props.threads) return this.renderBlankLinks();

    let items = [...this.props.threads];

    if (items.length < 12) {
      for (var i = items.length; i < 12; i++) {
        items.push({});
      }
    }

    return items.map((item, index) => {
      return <ThreadLink key={`${item._id}-${index}`} thread={item} />;
    });
  }
  render() {
    if (!this.props.threads) return this.renderBlank();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4 bg-white pl-0">{this.renderThreadLinks()}</div>
          <div className="col-8 bg-secondary hgt-10"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Threads;
