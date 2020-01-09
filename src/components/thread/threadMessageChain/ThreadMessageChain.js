import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { respondToMarketKitThread } from '../../../actions/KitbagMarketActions';
import { respondToMarketThread } from '../../../actions/MarketActions';
import validate from './ThreadMessageChainFormValidationRules';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import RadioGroupInput from '../../includes/controls/RadioGroupInput';
import Alert from '../../includes/Alert';

const ThreadMessageChain = ({
  thread,
  source,
  accountId,
  marketType,
  displayed
}) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialMessage = {
    accountId: accountId,
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

  const responseStateOptions = {
    market: {
      trade: ['open', 'withdraw'],
      wanted: ['open', 'withdraw'],
      default: ['open', 'close']
    },
    kitbag: {
      trade: ['open', 'accept', 'reject'],
      wanted: ['open', 'accept', 'reject'],
      default: ['open', 'close']
    }
  };

  function respondToThread() {
    if (source === 'market') {
      dispatch(respondToMarketThread(values.marketId, values.threadId, values));
    } else {
      dispatch(
        respondToMarketKitThread(
          accountId,
          values.marketId,
          values.threadId,
          values
        )
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
    return messages
      .filter(m => m.content.length > 0)
      .map((message, index) => {
        const { toSourceUser, content } = message;
        const toPrimaryUser =
          source === 'market' ? !toSourceUser : toSourceUser;
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

  const renderResponseStateOptions = () => {
    let options = responseStateOptions[source][marketType];
    if (!options) options = responseStateOptions[source]['default'];

    if (thread.responseState !== 'open') {
      if (source === 'market' || thread.responseState === 'withdraw') {
        return null;
      } else {
        options = ['reopen'];
      }
    }

    return (
      <RadioGroupInput
        options={options}
        field="responseState"
        value={values.responseState}
        handleChange={handleChange}
      />
    );
  };

  return (
    <React.Fragment>
      {thread._id === displayed && (
        <React.Fragment>
          <div className="thread-message-chain mb-2 bg-light border rounded-sm">
            {renderMessages()}
          </div>
          <Alert />
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
              {renderResponseStateOptions()}
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ThreadMessageChain;
