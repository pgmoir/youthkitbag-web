import React from 'react';
import Alert from '../includes/Alert';
import SignUpForm from '../auth/SignUpForm';
import { Link } from 'react-router-dom';

const LoggedOutLanding = () => {
  return (
    <div className="">
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
  // return (
  //   <section
  //     id="main"
  //     className="section container is-fluid"
  //     aria-label="main body of content plus related links and features"
  //   >
  //     <div className="jumbotron">
  //       <div className="container has-text-centered">
  //         <div className="row">
  //           <div className="col-12 col-lg-6">
  //             <h1>YouthKitbag</h1>
  //             <h2 className="pb-3">Inventory, Trade, Report</h2>
  //             <h3>school kit, club kit, team kit, any kit</h3>
  //             <h4 className="pb-3">
  //               sports gear, musical instruments, school uniforms, more ...
  //             </h4>
  //             <h5 className="pb-3">
  //               Why did I create this application?{' '}
  //               <Link to="/why#created">I explain here</Link>
  //             </h5>
  //           </div>
  //           <div className="col-12 col-lg-6">
  //             <div className="row">
  //               <div className="col-12 col-lg-10 mb-3 mx-auto bg-dark text-white p-5 rounded-lg">
  //                 <Alert />
  //                 <SignUpForm />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="container mb-3">
  //       <div className="row">
  //         <div className="col-12 col-sm-6 col-md-3">
  //           <article className="card card-link card-b1">
  //             <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
  //               10
  //             </span>
  //             <Link to="/auth/signup">
  //               <img
  //                 className="card-img-top"
  //                 src="/images/homepage-innertubes.jpg"
  //                 alt="Example of innertubes in kitbag"
  //                 role="presentation"
  //               />
  //               <div className="card-body">
  //                 <h2 className="card-title">Inventory</h2>
  //                 <p className="card-text">
  //                   Create multiple kitbags to keep a record of what sports,
  //                   musical, hobby or school equipment you own. Keep track of
  //                   expenditure, location and flag when replacement levels low.
  //                 </p>
  //               </div>
  //             </Link>
  //           </article>
  //         </div>
  //         <div className="col-12 col-sm-6 col-md-3">
  //           <article className="card card-link card-b1">
  //             <Link to="/auth/signup">
  //               <img
  //                 className="card-img-top"
  //                 src="/images/homepage-family.jpg"
  //                 alt="Example of innertubes in kitbag"
  //                 role="presentation"
  //               />
  //               <div className="card-body">
  //                 <h2 className="card-title">Family Kitbag</h2>
  //                 <p className="card-text">
  //                   Set up family or group kitbag, so that multiple members can
  //                   access view and store equipment details. Share with family
  //                   members. Help the kids find and manage their own kit!
  //                 </p>
  //               </div>
  //             </Link>
  //           </article>
  //         </div>{' '}
  //         <div className="col-12 col-sm-6 col-md-3">
  //           <article className="card card-link card-b1">
  //             <Link to="/auth/signup">
  //               <img
  //                 className="card-img-top"
  //                 src="/images/homepage-club.jpg"
  //                 alt="Example of innertubes in kitbag"
  //                 role="presentation"
  //               />
  //               <div className="card-body">
  //                 <h2 className="card-title">Clubs &amp; Teams</h2>
  //                 <p className="card-text">
  //                   Been scammed on eBay? Theft targetted on Facebook? There is
  //                   no open trading&#185; with the general public on
  //                   YouthKitbag. Only through vetted organisations that control
  //                   their own membership.
  //                 </p>
  //               </div>
  //             </Link>
  //           </article>
  //         </div>{' '}
  //         <div className="col-12 col-sm-6 col-md-3">
  //           <article className="card card-link card-b1">
  //             <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
  //               £3.99
  //             </span>
  //             <Link to="/auth/signup">
  //               <img
  //                 className="card-img-top"
  //                 src="/images/homepage-trade.jpg"
  //                 alt="Example of innertubes in kitbag"
  //                 role="presentation"
  //               />
  //               <div className="card-body">
  //                 <h2 className="card-title">Trade &amp; Report</h2>
  //                 <p className="card-text">
  //                   Sell or recycle your kit? Something stolen? Want new or
  //                   replacement item? YouthKitbag lets you trade, request and
  //                   report directly with other club, team members.
  //                 </p>
  //               </div>
  //             </Link>
  //           </article>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default LoggedOutLanding;
