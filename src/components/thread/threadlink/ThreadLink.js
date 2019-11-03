import React from 'react';

class ThreadLink extends React.Component {
  getLastMessage() {
    const { messages } = this.props.thread;
    if (messages.length === 0) return { content: '' };
    return messages[messages.length - 1];
  }

  displaySentOn(sentOn) {
    if (!sentOn) return '';
    return new Date(sentOn).toDateString();
  }

  getThumbnail(user) {
    if (user.profile.images.length === 0) return '/images/defaultthumb.png';
    return user.profile.images[0].imageUrl;
  }

  getBgStyle(responseState) {
    switch (responseState) {
      case 'accept':
        return 'bg-success text-light';
      case 'reject':
        return 'bg-danger text-light';
      case 'withdraw':
        return 'bg-warning text-gray-500';
      default:
        return 'bg-light';
    }
  }

  render() {
    const { _id, sourceUser, responseUser, responseState } = this.props.thread;
    const lastMessage = _id ? this.getLastMessage() : {};
    const isMarket = this.props.source === 'market';
    const secondaryUser = isMarket ? sourceUser : responseUser;

    return (
      <div
        className="thread-link mb-2"
        role="button"
        onClick={e => this.props.changeThreadDisplayed(this.props.thread._id)}
        tabIndex="0"
      >
        <div className="d-block float-left">
          <div className="p-2">
            <img
              src={
                _id
                  ? this.getThumbnail(secondaryUser)
                  : '/images/defaultthumb.png'
              }
              className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
              alt=""
            />
          </div>
        </div>
        <div className={this.getBgStyle(responseState)}>
          <div className="d-flex">
            <div className="mr-auto py-2 flex-truncated">
              {_id && secondaryUser.profile.username}
              {!_id && <div className="bg-light hgt-1 mr-3 mt-1">&nbsp;</div>}
            </div>
            <div className="py-2 flex-truncated text-right pr-2">
              {_id && this.displaySentOn(lastMessage.sentOn)}
              {!_id && <div className="bg-light hgt-1 mt-1">&nbsp;</div>}
            </div>
          </div>
          <div className="d-flex">
            {/* <div className="pb-2 mr-2">
              <i className="fas fa-comment text-light"></i>
            </div> */}
            <div className="pb-2 d-block flex-truncated">
              {_id && lastMessage.content}
              {!_id && <div className="bg-light hgt-1 w-100 mt-1">&nbsp;</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThreadLink;
