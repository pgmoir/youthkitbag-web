import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="purple-gradient">
      <Link
        id="footer-acc-jump"
        className="sr-only sr-only-focusable"
        to="#header-acc-jump"
      >
        <div className="container">
          <span className="skiplink-text">Skip to header</span>
        </div>
      </Link>
      <section className="footer" aria-label="secondary navigation">
        <div className="container text-center text-md-left p-4">
          <h2 className="sr-only">
            Supplementary navigation to key corporate and informational sections
            of the website, including contact details
          </h2>
          <div className="row text-center text-md-left">
            <div className="col-md-4 mx-auto">
              <h3 className="text-uppercase mb-4 font-weight-bold h6">
                About YouthKitbag
              </h3>
              <ul className="links">
                <li>
                  <Link to="/help-and-contact/index">Help &amp; contacts</Link>
                </li>
                <li className="links">
                  <Link to="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>
            <hr className="w-100 clearfix d-md-none mx-3" />
            <div className="col-md-4 mx-auto">
              <h3 className="text-uppercase mb-4 font-weight-bold h6">
                Information for
              </h3>
              <ul className="links">
                <li>
                  <Link to="/info-for/media/index">Media</Link>
                </li>
              </ul>
            </div>
            <hr className="w-100 clearfix d-md-none mx-3" />
            <div className="col-md-4 mx-auto">
              <h3 className="sr-only">Contact details</h3>
              <p>
                <span
                  aria-hidden="true"
                  className="fas fa-home mr-3"
                  title="Contact address"
                ></span>
                <span className="sr-only">Our contact address is:</span>
                YouthKitbag c/o Moir Consultancy Ltd
              </p>
              <p>
                <span
                  aria-hidden="true"
                  className="fas fa-envelope mr-3"
                  title="Contact email"
                ></span>
                <span className="sr-only">Our contact email address is:</span>
                admin@youthkitbag.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="footer footer-copyright"
        aria-label="links to terms and conditions, privacy and cookies statements and accessibility standards for this website"
      >
        <div className="container text-center py-2">
          <h2 className="sr-only">
            Navigation to legal and accessibility content
          </h2>
          <div className="row d-flex align-items-center">
            <div className="col-md-8">
              <div className="d-flex flex-column flex-md-row">
                <div className="p-2">
                  <Link to="/site/terms">Terms &amp; conditions </Link>
                </div>
                <div className="p-2">
                  <Link to="/site/privacy">Privacy Policy</Link>
                </div>
                <div className="p-2">
                  <Link to="/site/cookiesy">Cookies</Link>
                </div>
                <div className="p-2">
                  <Link to="/site/security">Security</Link>
                </div>
                <div className="p-2">
                  <Link to="/site/accessibility">Accessibility</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column flex-md-row-reverse">
                <div className="p-2">© Copyright Moir Consultancy Limited</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
