import React from 'react';

class Thread extends React.Component {
  renderBlank() {
    return <div className="bg-light hgt-3 mb-3">&nbsp;</div>;
  }

  render() {
    if (!this.props.thread) return this.renderBlank();

    const { subject } = this.props.thread;
    return (
      <React.Fragment>
        <h3>{`Thread for "${subject}"`}</h3>
      </React.Fragment>
    );
  }
}

export default Thread;
