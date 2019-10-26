import React from 'react';

class ThreadLink extends React.Component {
  getLastMessage() {
    const { messages } = this.props.thread;
    if (messages.length === 0) return { content: '' };
    return messages[messages.length - 1];
  }

  displaySentOn(sentOn) {
    if (!sentOn) return 'UPDATED';

    return new Date(sentOn).toDateString();
  }

  getThumbnail() {
    const { sourceUser } = this.props.thread;
    if (sourceUser.profile.images.length === 0) {
      return '/images/defaultthumb.png';
    }
    return sourceUser.profile.images[0].imageUrl;
  }

  render() {
    const { _id, sourceUser } = this.props.thread;
    const lastMessage = _id ? this.getLastMessage() : {};

    return (
      <div className="thread-link border-top">
        <div className=" d-block float-left">
          <div className="p-2">
            <img
              src={_id ? this.getThumbnail() : '/images/defaultthumb.png'}
              className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="mr-auto py-2 flex-truncated">
              {_id && sourceUser.profile.username}
              {!_id && (
                <div className="bg-secondary hgt-1 mr-3 mt-1">&nbsp;</div>
              )}
            </div>
            <div className="py-2 flex-truncated text-right">
              {_id && this.displaySentOn(lastMessage.sentOn)}
              {!_id && <div className="bg-secondary hgt-1 mt-1">&nbsp;</div>}
            </div>
          </div>
          <div className="d-flex">
            <div className="pb-2 mr-2">
              <i className="fas fa-comment text-secondary"></i>
            </div>
            <div className="pb-2 d-block flex-truncated">
              {_id && lastMessage.content}
              {!_id && (
                <div className="bg-secondary hgt-1 w-100 mt-1">&nbsp;</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThreadLink;
