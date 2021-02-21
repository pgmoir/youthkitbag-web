import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered pb-5">
        <p>
          <strong>YouthKitbag</strong> by{' '}
          <a href="https://pgmoir.wordpress.com/" className="a11y-highlight">
            Moir Consultancy Limited @ 2021
          </a>
        </p>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <p>About YouthKitbag</p>
          <p>
            <Link to="/bundles" className="a11y-highlight">
              Buy a Bundle
            </Link>
          </p>
          <p>
            <Link to="/site/helpandsupport" className="a11y-highlight">
              Help
            </Link>
          </p>
          <p>
            <Link to="/site/mediaenquiries" className="a11y-highlight">
              Media
            </Link>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>Information for</p>
          <p>
            <Link to="/site/termsandconditions" className="a11y-highlight">
              Terms &amp; Conditions
            </Link>
          </p>
          <p>
            <Link to="/site/privacypolicy" className="a11y-highlight">
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link to="/site/cookies" className="a11y-highlight">
              Cookies
            </Link>
          </p>
          <p>
            <Link to="/site/security" className="a11y-highlight">
              Security
            </Link>
          </p>
          <p>
            <Link to="/site/accessibility" className="a11y-highlight">
              Accessibility
            </Link>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>Contact details</p>
          <p>
            <span className="sr-only">Our address is:</span>
            YouthKitbag c/o Moir Consultancy Ltd
          </p>
          <p>
            <a href="mailto:admin@youthkitbag.com" className="a11y-highlight">
              admin@youthkitbag.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
