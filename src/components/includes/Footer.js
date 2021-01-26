import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>YouthKitbag</strong> by{' '}
          <a href="">Moir Consultancy Limited</a>
        </p>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <p>About YouthKitbag</p>
          <Link
            to="/help-and-contact/index"
            className="text-light a11y-highlight"
          >
            Help &amp; contacts
          </Link>
          <Link to="/bundles" className="text-light a11y-highlight">
            Bundles
          </Link>
          <Link
            to="/info-for/media/index"
            className="text-light a11y-highlight"
          >
            Media
          </Link>
        </div>
        <div className="column has-text-centered">
          <p>Information for</p>
          <Link to="/site/terms" className="a11y-highlight">
            Terms &amp; conditions{' '}
          </Link>

          <Link to="/site/privacy" className="a11y-highlight">
            Privacy Policy
          </Link>

          <Link to="/site/cookiesy" className="a11y-highlight">
            Cookies
          </Link>

          <Link to="/site/security" className="a11y-highlight">
            Security
          </Link>

          <Link to="/site/accessibility" className="a11y-highlight">
            Accessibility
          </Link>
        </div>
        <div className="column has-text-centered">
          <p>Contact details</p>
          <p>
            <span className="sr-only">Our contact address is:</span>
            YouthKitbag c/o Moir Consultancy Ltd
          </p>
          <a
            href="mailto:admin@youthkitbag.com"
            className="text-light a11y-highlight"
          >
            admin@youthkitbag.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
