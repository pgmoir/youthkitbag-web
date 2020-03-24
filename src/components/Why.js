import React from 'react';
import { Link } from 'react-router-dom';

const Why = () => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container px-0">
          <h1 className="sr-only">Why?</h1>
          <div className="row m-0 mt-3 px-0 pb-3 bg-light">
            <div className="col-lg-6 p-0 order-1">
              <img
                className="img-fluid pr-0 pr-lg-3 pb-3 pb-lg-0"
                src="/images/why-golf.jpg"
                alt=""
              ></img>
            </div>
            <div className="col-lg-6 p-3 order-2 text-center">
              <h2 className="h1 pb-2">Why did I create this app?</h2>
              <p className="f-lg">
                From a very early age my kids were very active, and with all
                those activities, came the need to buy different types of
                equipment. Uniforms, instruments, apparatus, gear - KIT!
              </p>
              <p className="f-md">
                First it was years of gymnastics and football, then karate,
                kick-boxing, golf, tennis, the recorder, swimming, piano, cubs,
                scouts and also school sports like netball.
              </p>
              <p className="f-md">
                As each sport came and went, a small stock pile of equipment got
                left behind in one cupboard or another.
              </p>
            </div>
          </div>

          <div className="row m-0 px-0 pb-3 bg-light">
            <div className="col-lg-6 p-0 order-1 order-lg-2">
              <img
                className="img-fluid pl-0 pl-lg-3 pb-3 pb-lg-0"
                src="/images/why-mtb.jpg"
                alt=""
              ></img>
            </div>
            <div className="col-lg-6 p-3 order-2 order-lg-1 text-center">
              <h2 className="h1 pb-2">And then came cycling</h2>
              <p className="f-lg">
                It started with road cycling for one, then the second child
                switched sports. Soon the passion grew for track cycling and
                cyclo-cross. And a brief dabble with mountain biking too.
              </p>
              <p className="f-md">
                Bikes, clothes, inner tubes, cassettes, wheels, tools and more.
                So much equipment, and so easy to forget what and where. I
                couldn&apos;t keep track of it all. With YouthKitbag, I can! And
                because it is based on group accounts, so can the rest of the
                family.
              </p>
            </div>
          </div>

          <div className="row m-0 mb-3 px-0 bg-light">
            <div className="col-lg-6 p-0 order-1">
              <img
                className="img-fluid pr-0 pr-lg-3 pb-3 pb-lg-0"
                src="/images/why-cross.jpg"
                alt=""
              ></img>
            </div>
            <div className="col-lg-6 p-3 order-2 text-center">
              <h2 className="h1 pb-2">Kit end of life?</h2>
              <p className="f-lg">
                I also wanted to easily sell or recycle items of kit to other
                members of the clubs or teams, without the hassle you can get
                with eBay and Facebook sales.
              </p>
              <p className="f-lg pb-3 text-dark">
                And now you can, with &quot;YouthKitbag&quot;!
              </p>
              <Link
                className="btn btn-primary btn-lg text-white py-3 px-5 bg-dark"
                to="/auth/signup"
              >
                Sign up and try for free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Why;
