import React from 'react';
import { relativeTimeFromNow } from '../../utils/date';
import { getImage } from '../../utils/image';

const ThreadLink = ({ thread, source, changeThreadDisplayed }) => {
  if (!thread.messages) return null;

  const { _id, sourceKitbag, responseUser, messages } = thread;
  const lastMessage = messages[messages.length - 1];
  const sourceUser = source === 'market' ? sourceKitbag : responseUser;

  return (
    <div
      className="box is-flex is-clickable"
      role="button"
      onClick={() => changeThreadDisplayed(thread._id)}
      onKeyPress={() => changeThreadDisplayed(thread._id)}
      tabIndex="0"
    >
      <div className="is-flex-shrink-0 is-flex-grow-0 is-align-self-center pr-4">
        <div className="image">
          <img
            src={getImage({
              images: sourceUser.images,
              email: sourceUser.email,
            })}
            className="is-avatar is-rounded is-48x48"
            alt=""
          />
        </div>
      </div>
      <div className="is-flex-grow-1 has-truncated">
        <div className="is-flex">
          <div className="is-flex-shrink-1 is-flex-grow-1 has-text-weight-medium has-truncated pr-2">
            <div className="is-truncated-text">{_id && sourceUser.name}</div>
          </div>
          <div className="is-flex-shrink-0 is-flex-wrap-nowrap is-italic">
            {relativeTimeFromNow(lastMessage.sentOn)}
          </div>
        </div>
        <div className="is-truncated-text">{_id && lastMessage.content}</div>
      </div>
    </div>
  );
};

export default ThreadLink;
