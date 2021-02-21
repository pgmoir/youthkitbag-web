import React from 'react';
import { fetchContent } from '../../actions/ContentActions';
import { connect } from 'react-redux';
import Title from '../includes/title/Title';
import useContentful from '../hooks/useContentful';
import Breadcrumb from '../includes/Breadcrumb';
import { ContentTypes } from '../../enums/contentTypes.enum';

const mapStateToProps = (state) => ({
  content: state.content.data,
});

const mapDispatchToProps = {
  fetchContent,
};

const Content = ({ content, fetchContent, match }) => {
  const { contentId } = match.params;
  const { renderAllConent } = useContentful(
    ContentTypes[contentId.toUpperCase()],
    fetchContent
  );

  if (!content) {
    return (
      <div className="container">
        <Title title="Loading ..." />
      </div>
    );
  }

  const crumbs = [{ title: 'Home', to: '/' }, { title: content.fields.title }];

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <Title title={content.fields.title} />
      <div className="container">
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
