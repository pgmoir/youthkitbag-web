import React from 'react';

class ThreadMessageChain extends React.Component {
  getLastMessage() {
    const { messages } = this.props.thread;
    if (messages.length === 0) return { content: '' };
    return messages[messages.length - 1];
  }

  displaySentOn(sentOn) {
    if (!sentOn) return <div className="bg-white pb-1"></div>;
    const sentOnDate = new Date(sentOn);
    return (
      <div className="bg-white p-2 text-center pb-3">
        {sentOnDate.toDateString()}
      </div>
    );
  }

  getThumbnail(user) {
    if (user.profile.images.length === 0) {
      return '/images/defaultthumb.png';
    }
    return user.profile.images[0].imageUrl;
  }

  renderMessages() {
    const { messages, sourceUser, responseUser } = this.props.thread;
    const isMarket = this.props.source === 'market';
    const primaryUser = isMarket ? responseUser : sourceUser;
    const secondaryUser = isMarket ? sourceUser : responseUser;
    return messages.map((message, index) => {
      const { toSourceUser, content } = message;
      const toPrimaryUser =
        this.props.source === 'market' ? !toSourceUser : toSourceUser;
      return (
        <div className="bg-white" key={`${index}`}>
          {this.displaySentOn(message.sentOn)}
          <div className="pb-3">
            <div
              className={`d-block ${
                toPrimaryUser ? 'float-right' : 'float-left'
              } px-2 pb-3`}
            >
              <img
                src={
                  toPrimaryUser
                    ? this.getThumbnail(secondaryUser)
                    : this.getThumbnail(primaryUser)
                }
                className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                alt=""
              />
            </div>
            <div>
              <div
                className={`d-flex ${
                  toPrimaryUser
                    ? 'justify-content-end'
                    : 'justify-content-start'
                }`}
              >
                <div className="p-2 w-75 bg-light">{content}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="thread-message-chain pb-2">{this.renderMessages()}</div>
    );
  }
}

export default ThreadMessageChain;
