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
      className="is-clickable is-flex box"
      role="button"
      onClick={() => changeThreadDisplayed(thread._id)}
      onKeyPress={() => changeThreadDisplayed(thread._id)}
      tabIndex="0"
    >
      <div className="is-flex-shrink-0 is-flex-grow-0 is-align-self-center pr-4">
        <div className="image">
          <img
            src={_id ? threadWith.image : '/images/defaultthumb.png'}
            className="is-avatar is-rounded is-64x64"
            alt=""
          />
        </div>
      </div>

      <div className="is-flex-grow-1 has-truncated">
        <div className="is-flex">
          <div className="is-flex-shrink-1 is-flex-grow-1 has-truncated">
            <div className="is-truncated-text">{_id && threadWith.name}</div>
          </div>
          <div className="is-flex-shrink-0 is-flex-wrap-nowrap">
            <em>{_id && displaySentOn(lastMessage.sentOn)}</em>
          </div>
        </div>
        <div className="is-truncated-text">{_id && lastMessage.content}</div>
      </div>
    </div>
  );
};

export default ThreadLink;
