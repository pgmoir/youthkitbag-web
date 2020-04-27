import React from 'react';
import { fetchContent } from '../../actions/ContentActions';
import { connect } from 'react-redux';
import Title from '../includes/title/Title';
import useContentful from '../hooks/useContentful';

const mapStateToProps = (state) => ({
  content: state.content.data,
});

const mapDispatchToProps = {
  fetchContent,
};

const Content = ({ contentId, content, fetchContent }) => {
  const { renderAllConent } = useContentful(contentId, fetchContent);

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
              {renderAllConent(content)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
