import React from 'react';

const ThreadLink = ({ thread, source, changeThreadDisplayed }) => {
  function getLastMessage() {
    const { messages } = thread;
    if (messages.length === 0) return { content: '' };
    return messages[messages.length - 1];
  }

  function displaySentOn(sentOn) {
    if (!sentOn) return '';
    return new Date(sentOn).toDateString();
  }

  function getBgStyle(responseState) {
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
  const { _id, sourceKitbag, responseUser, responseState } = thread;
  const lastMessage = _id ? getLastMessage() : {};
  const isMarket = source === 'market';
  const threadWith = isMarket ? sourceKitbag : responseUser;

  return (
    <div
      className="thread-link mb-2"
      role="button"
      onClick={(e) => changeThreadDisplayed(thread._id)}
      tabIndex="0"
    >
      <div className="d-block float-left">
        <div className="p-2">
          <img
            src={_id ? threadWith.image : '/images/defaultthumb.png'}
            className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
            alt=""
          />
        </div>
      </div>
      <div className={getBgStyle(responseState)}>
        <div className="d-flex">
          <div className="mr-auto py-2 flex-truncated">
            {_id && threadWith.name}
            {!_id && <div className="bg-light hgt-1 mr-3 mt-1">&nbsp;</div>}
          </div>
          <div className="py-2 flex-truncated text-right pr-2">
            {_id && displaySentOn(lastMessage.sentOn)}
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
};

export default ThreadLink;
