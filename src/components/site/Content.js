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
      <div className="container">
        <Title title="Loading ..." />
      </div>
    );
  }

  return (
    <div className="container">
      <Title title={content.fields.title} />
      <div className="content">
        <p>
          <em>
            Last updated:{' '}
            {new Date(content.sys.updatedAt).toLocaleString('en-GB', {
              timeZone: 'UTC',
            })}
          </em>
        </p>
      </div>
      <div className="content">{renderAllConent(content)}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
