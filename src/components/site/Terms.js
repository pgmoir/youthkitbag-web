import React, { useEffect } from 'react';
import { fetchContent } from '../../actions/ContentActions';
import { connect } from 'react-redux';
import Title from '../includes/title/Title';

const termsAndConditionsId = '6Z9bv6CbhyLRB48NzYlCer';

const mapStateToProps = (state) => ({
  content: state.content.data,
});

const mapDispatchToProps = {
  fetchContent,
};

const Terms = ({ content, fetchContent }) => {
  useEffect(() => {
    fetchContent(termsAndConditionsId);
  }, [fetchContent]);

  if (!content) {
    return (
      <div>
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <div className="row m-5 p-5 bg-light">
              <div className="col-12">
                <h1>Loading ...</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  function renderContent(item, index) {
    if (item.nodeType === 'heading-2') {
      return (
        <h2 key={index}>{item.content.map((c, i) => renderContent(c, i))}</h2>
      );
    }
    if (item.nodeType === 'paragraph') {
      return (
        <p key={index}>{item.content.map((c, i) => renderContent(c, i))}</p>
      );
    }
    if (item.nodeType === 'text') {
      return item.value;
    }
    return null;
  }

  function renderAllConent() {
    return content.fields.body.content.map((c, i) => renderContent(c, i));
  }

  return (
    <div>
      <Title title={content.fields.title} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>
                <em>
                  Last updated:{' '}
                  {new Date(content.sys.updatedAt).toLocaleString('en-GB', {
                    timeZone: 'UTC',
                  })}
                </em>
              </p>
              {renderAllConent()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
