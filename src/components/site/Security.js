import React from 'react';
import { Link } from 'react-router-dom';

const Security = () => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <h1 className="sr-only">Why?</h1>
          <div className="row m-5 p-5 bg-light">
            <div className="col-12 col-lg-6"></div>
            <div className="col-12 col-lg-6">
              <h2 className="h1 pb-3">Why did I create this app?</h2>
              <p className="f-lg">
                From a very early age my two kids were very active.
              </p>
              <p className="f-lg">
                And all those activities required us to buy equipment. Uniforms,
                instruments, apparatus, gear - KIT!
              </p>
              <p className="f-md">
                We went through years of gymnastics, football, karate,
                kick-boxing, swimming, piano, cubs, scouts, netball and
                eventually we settled on cycling. And boy! Does that sport
                require a lot of kit!
              </p>
              <p className="f-md">
                So much so that I couldn&apos;t keep track of it all. &quot;Have
                we got a 10-speed cassette - from 15 to 28 tooth?&quot; someone
                would ask. I had no idea. But now I do, with this app, and so do
                they. They can find out what we have and where it is.
              </p>
              <p className="f-md">
                To make things better, I wanted to be able to sell the grown out
                of and unwanted kit, firstly to our local club or team, but
                maybe then to offer it to a wider audience.
              </p>
              <p className="f-lg pb-3 text-dark">
                Now you can take advantage of this unique app. Keep stock,
                share, sell, donate, buy easily amongst club and team mates.
                Track down kit being sold by others. Keep track of everything in
                your &quot;YouthKitbag&quot;!
              </p>
              <div className="has-text-centered">
                <Link
                  className="btn btn-primary btn-lg text-white py-3 px-5 bg-dark"
                  to="/auth/signup"
                >
                  Sign up and try for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
