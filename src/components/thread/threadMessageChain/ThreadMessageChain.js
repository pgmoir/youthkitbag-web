import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { respondToMarketKitThread } from '../../../actions/KitbagMarketActions';
import { respondToMarketThread } from '../../../actions/MarketActions';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import RadioGroupInput from '../../includes/controls/RadioGroupInput';
import Alert from '../../includes/Alert';
import { connect } from 'react-redux';
import validate from '../../includes/FormEmptyValidationRules';

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

  const displaySentOn = (sentOn) => {
    if (!sentOn) return <div className="bg-white pb-1"></div>;
    const sentOnDate = new Date(sentOn);
    return (
      <div className="bg-white p-2 has-text-centered pb-3">
        {sentOnDate.toDateString()}
      </div>
    );
  };

  const renderMessages = () => {
    const { messages } = thread;

    return messages
      .filter((m) => m.content.length > 0)
      .map((message, index) => {
        const { author, content } = message;
        return (
          <div className="has-background-white" key={`${index}`}>
            {displaySentOn(message.sentOn)}
            <div className="is-flex">
              <div className="is-flex-shrink-0 is-flex-grow-0 is-align-self-center pr-4">
                <div className="image">
                  <img
                    src={author.image}
                    className="is-avatar is-rounded is-48x48"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="">
                  <div className="">{content}</div>
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
    <>
      {thread._id === displayed && (
        <>
          <div className="has-background-success box">{renderMessages()}</div>
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
            <div className="form-row">
              <div className="col"></div>
              {renderResponseStateOptions()}
              <div className="col-auto">
                <button className="button is-primary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadMessageChain);
