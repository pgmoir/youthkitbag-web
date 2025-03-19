import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

const Title = ({ title, icon, iconAction, hasAction, hasHr = true }) => {
  if (title === '') {
    return null;
  }

  const iconClasses = classNames(`ml-3 ${icon}`, {
    'is-clickable': hasAction
  });

  return (
    <>
      <Helmet>
        <title>{`${title} - YouthKitbag`}</title>
      </Helmet>
      <h1 className="title is-size-4">
        {title}
        {icon && iconAction && (
          <i
            className={iconClasses}
            onClick={() => iconAction()}
            role="button"
            tabIndex="0"
          ></i>
        )}
        {icon && !iconAction && <i className={iconClasses}></i>}
      </h1>
      {hasHr && <hr />}
    </>
  );
};

export default Title;
