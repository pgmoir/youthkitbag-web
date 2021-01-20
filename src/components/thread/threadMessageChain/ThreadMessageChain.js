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
      <div className="bg-white p-2 text-center pb-3">
        {sentOnDate.toDateString()}
      </div>
    );
  };

  const renderMessages = () => {
    const { messages } = thread;

    return messages
      .filter((m) => m.content.length > 0)
      .map((message, index) => {
        const { fromKitbag, author, content } = message;
        return (
          <div className="bg-white" key={`${index}`}>
            {displaySentOn(message.sentOn)}
            <div className="pb-3">
              <div
                className={`d-block ${
                  fromKitbag ? 'float-left' : 'float-right'
                } px-2 pb-3`}
              >
                <img
                  src={author.image}
                  className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                  alt="ALTER"
                />
              </div>
              <div>
                <div
                  className={`d-flex ${
                    fromKitbag ? 'justify-content-start' : 'justify-content-end'
                  }`}
                >
                  <div
                    className={`p-2 w-75 bg-affair-30 rounded-lg position-relative display-linebreak  ${
                      fromKitbag ? 'speech-left' : 'speech-right'
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
    <>
      {thread._id === displayed && (
        <>
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
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadMessageChain);
