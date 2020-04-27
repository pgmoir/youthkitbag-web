import React from 'react';
import { useEffect } from 'react';

const useContentful = (contentId, fetchContent) => {
  useEffect(() => {
    fetchContent(contentId);
  }, [fetchContent, contentId]);

  const renderContent = (item, index) => {
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
    if (item.nodeType === 'unordered-list') {
      return (
        <ul key={index}>{item.content.map((c, i) => renderContent(c, i))}</ul>
      );
    }
    if (item.nodeType === 'list-item') {
      return (
        <li key={index}>{item.content.map((c, i) => renderContent(c, i))}</li>
      );
    }
    if (item.nodeType === 'text') {
      return item.value;
    }
    return null;
  };

  const renderAllConent = (content) => {
    return content.fields.body.content.map((c, i) => renderContent(c, i));
  };

  return {
    renderAllConent,
  };
};

export default useContentful;
