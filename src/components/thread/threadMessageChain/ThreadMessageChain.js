import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { respondToMarketKitThread } from '../../../actions/KitbagMarketActions';
import { respondToMarketThread } from '../../../actions/MarketActions';
import validate from './ThreadMessageChainFormValidationRules';

const ThreadMessageChain = ({ thread, source }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialMessage = {
    marketId: thread.source,
    threadId: thread._id,
    content: ''
  };

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    initialMessage,
    respondToThread,
    validate
  );

  function respondToThread() {
    if (source === 'market') {
      dispatch(respondToMarketThread(values.marketId, values.threadId, values));
    } else {
      dispatch(
        respondToMarketKitThread(values.marketId, values.threadId, values)
      );
    }
    values.content = '';
  }

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  const displaySentOn = sentOn => {
    if (!sentOn) return <div className="bg-white pb-1"></div>;
    const sentOnDate = new Date(sentOn);
    return (
      <div className="bg-white p-2 text-center pb-3">
        {sentOnDate.toDateString()}
      </div>
    );
  };

  const getThumbnail = user => {
    if (user.profile.images.length === 0) {
      return '/images/defaultthumb.png';
    }
    return user.profile.images[0].imageUrl;
  };

  const renderMessages = () => {
    const { messages, sourceUser, responseUser } = thread;
    const isMarket = source === 'market';
    const primaryUser = isMarket ? responseUser : sourceUser;
    const secondaryUser = isMarket ? sourceUser : responseUser;
    return messages.map((message, index) => {
      const { toSourceUser, content } = message;
      const toPrimaryUser = source === 'market' ? !toSourceUser : toSourceUser;
      return (
        <div className="bg-white" key={`${index}`}>
          {displaySentOn(message.sentOn)}
          <div className="pb-3">
            <div
              className={`d-block ${
                toPrimaryUser ? 'float-right' : 'float-left'
              } px-2 pb-3`}
            >
              <img
                src={
                  toPrimaryUser
                    ? getThumbnail(secondaryUser)
                    : getThumbnail(primaryUser)
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
  };

  return (
    <React.Fragment>
      <div className="thread-message-chain pb-2">{renderMessages()}</div>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            name="content"
            className="form-control"
            type="text"
            onChange={handleChange}
            value={values.content}
            id="content"
            arialabel="Your reply"
            placeholder="Your reply"
            error={errors.content}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ThreadMessageChain;
