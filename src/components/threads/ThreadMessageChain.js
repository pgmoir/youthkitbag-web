import React, { useEffect } from 'react';
import classNames from 'classnames';
import useForm from '../hooks/useForm';
import { respondToMarketKitThread } from '../../actions/KitbagMarketActions';
import { respondToMarketThread } from '../../actions/MarketActions';
import TextAreaInput from '../includes/controls/TextAreaInput';
import RadioGroupInput from '../includes/controls/RadioGroupInput';
import Alert from '../includes/Alert';
import { connect } from 'react-redux';
import validate from '../includes/FormEmptyValidationRules';
import { relativeTimeFromNow } from '../../utils/date';

const mapStateToProps = (state) => ({
  newErrors: state.toast.errors,
});

const mapDispatchToProps = {
  respondToMarketThread,
  respondToMarketKitThread,
};

const ThreadMessageChain = ({
  thread,
  source,
  kitbagId,
  marketType,
  displayed,
  newErrors,
  respondToMarketThread,
  respondToMarketKitThread,
}) => {
  const initialMessage = {
    kitbagId: kitbagId,
    marketId: thread.sourceItem,
    threadId: thread._id,
    content: '',
    responseState: thread.responseState,
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
      default: ['open', 'close'],
    },
    kitbag: {
      trade: ['open', 'accept', 'reject'],
      wanted: ['open', 'accept', 'reject'],
      default: ['open', 'close'],
    },
  };

  function respondToThread() {
    if (source === 'market') {
      respondToMarketThread(values.marketId, values.threadId, values);
    } else {
      respondToMarketKitThread(
        kitbagId,
        values.marketId,
        values.threadId,
        values
      );
    }
    values.content = '';
  }

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  const renderMessages = () => {
    const { messages } = thread;

    return messages
      .filter((m) => m.content.length > 0)
      .map((message, index) => {
        const { fromKitbag, author, content, sentOn } = message;

        const messageClasses = classNames('is-flex', {
          'is-flex-direction-row-reverse': fromKitbag,
          'is-flex-direction-row': !fromKitbag,
        });

        const contentClasses = classNames('is-speech', {
          'is-speech-right mx-3 mr-5': fromKitbag,
          'is-speech-left ml-5 mr-3': !fromKitbag,
        });

        return (
          <div className="" key={`${index}`}>
            <div className="has-text-light has-text-centered is-italic p-2">
              {relativeTimeFromNow(sentOn)}
            </div>
            <div className={messageClasses}>
              <div className="is-flex-shrink-0 is-flex-grow-0 is-align-self-center">
                <div className="image">
                  <img
                    src={author.image}
                    className="is-avatar is-rounded is-48x48"
                    alt=""
                  />
                </div>
              </div>
              <div className="is-flex-grow-1">
                <div className={contentClasses}>{content}</div>
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
        isRow={true}
      />
    );
  };

  const showReply =
    source === 'kitbag' ||
    (source === 'market' && thread.responseState !== 'close');

  return (
    <>
      {thread._id === displayed && (
        <>
          <div className="has-background-success box">
            <div className="mb-5">{renderMessages()}</div>
            {showReply && (
              <>
                <Alert />
                <form onSubmit={handleSubmit}>
                  <TextAreaInput
                    handleChange={handleChange}
                    field="content"
                    value={values.content}
                    error={errors.content}
                    addClassName="mb-2"
                    rows="2"
                    placeholder="Reply with message"
                  />
                  <div className="is-flex is-align-items-center mt-3">
                    <div className="is-flex-grow-1">
                      {renderResponseStateOptions()}
                    </div>
                    <div className="is-flex-grow-0">
                      <button className="button is-primary" type="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadMessageChain);
