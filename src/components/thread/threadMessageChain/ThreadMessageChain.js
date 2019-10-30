import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { respondToMarketKitThread } from '../../../actions/KitbagMarketActions';
import { respondToMarketThread } from '../../../actions/MarketActions';
import validate from './ThreadMessageChainFormValidationRules';
import TextAreaInput from '../../includes/controls/TextAreaInput';

const ThreadMessageChain = ({ thread, source }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialMessage = {
    marketId: thread.source,
    threadId: thread._id,
    content: '',
    responseState: thread.responseState
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
                <div
                  className={`p-2 w-75 bg-affair-30 rounded-lg position-relative  ${
                    toPrimaryUser ? 'speech-right' : 'speech-left'
                  }`}
                >
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderResponseOptions = () => {
    return (
      <div className="col-auto mt-2">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input form-check-adjust"
            type="radio"
            name="responseState"
            id="open"
            value="open"
            onChange={handleChange}
            checked={values.responseState === 'open'}
          />
          <label className="form-check-label" htmlFor="messaging">
            Messaging
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input form-check-adjust"
            type="radio"
            name="responseState"
            id="accepted"
            value="accepted"
            onChange={handleChange}
            checked={values.responseState === 'accepted'}
          />
          <label className="form-check-label" htmlFor="accept">
            Accept
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input form-check-adjust"
            type="radio"
            name="responseState"
            id="rejected"
            value="rejected"
            onChange={handleChange}
            checked={values.responseState === 'rejected'}
          />
          <label className="form-check-label" htmlFor="reject">
            Reject
          </label>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="thread-message-chain mb-2 bg-light border rounded-sm">
        {renderMessages()}
      </div>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <TextAreaInput
              handleChange={handleChange}
              field="content"
              value={values.content}
              error={errors.content}
              addClassName="mb-2"
              rows="2"
              placeholder="Reply with message"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col"></div>
          {renderResponseOptions()}
          <div className="col-auto">
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
