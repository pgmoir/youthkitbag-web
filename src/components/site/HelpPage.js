import React from 'react';

import Breadcrumb from '../includes/Breadcrumb';
import Title from '../includes/title/Title';

const HelpPage = () => {
  const pageTitle = 'Help';

  const crumbs = [{ title: 'Home', to: '/' }, { title: pageTitle }];

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <Title title={pageTitle} />
      <div className="container">
        <div className="content">
          <p>This page will display links to the help docuemntation</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
