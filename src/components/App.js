import React from 'react';
import { Link, Router, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PrivateRoute from '../helpers/privateRoute';
import history from '../helpers/history';
import User from './auth/User';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Home from './Home';
import Why from './Why';
import Packages from './Packages';
import Content from './site/Content';
import Security from './site/Security';
import Accessibility from './site/Accessibility';
import SignUp from './auth/SignUpPage';
import Login from './auth/LoginPage';
import Reset from './auth/ResetPage';
import NewPassword from './auth/NewPasswordPage';
import Logout from './auth/Logout';
import Token from './auth/Token';
import PackagePurchasePage from './PackagePurchasePage';
import Groups from './group/Groups';
import GroupPage from './group/GroupPage';
import ShowGroupPage from './show/ShowGroupPage';
import GroupStatus from './group/GroupStatus';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';
import GroupMemberJoin from './group/GroupMemberJoin';
import GroupMemberLeave from './group/GroupMemberLeave';
import KitBag from './kitbag/kit/KitBag';
import KitPage from './kitbag/kit/KitPage';
import KitDelete from './kitbag/kit/KitDelete';
import MarketKitPage from './kitbag/market/MarketKitPage';
import MarketItems from './market/MarketItems';
import MarketItemViewPage from './market/MarketItemViewPage';
import MarketKitDelete from './kitbag/market/MarketKitDelete';
import SettingsPage from './account/SettingsPage';
import AccountPage from './accounts/AccountPage';
import AccountMemberInvite from './accounts/AccountMemberInvite';
import AccountMemberAccept from './accounts/AccountMemberAccept';
import AccountMemberJoin from './accounts/AccountMemberJoin';
import LearnMore from './learn/LearnMore';
import BetaAnnouncement from './home/BetaAnnouncement';
import GroupMemberDelete from './group/GroupMemberDelete';
import DeleteUser from './account/DeleteUser';
import { connect } from 'react-redux';
import { TERMSCONDITIONS, PRIVACYPOLICY } from './site/content-types';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const App = ({ auth }) => {
  return (
    <div className="react-body">
      <Helmet>
        <title>
          YouthKitbag - Inventory, Trade, Aquire, Reporting for all youth kit
        </title>
      </Helmet>
      <Router history={history}>
        <User />
        <Header />
        <BetaAnnouncement />
        <main>
          <noscript>
            You need to enable JavaScript to run this application.
          </noscript>
          <Link
            id="main-acc-jump"
            className="sr-only sr-only-focusable"
            to="#footer-acc-jump"
          >
            <div className="container">
              <span className="skiplink-text">Skip to footer content</span>
            </div>
          </Link>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/why" exact component={Why} />
            <Route path="/packages" exact component={Packages} />

            <Route path="/learn/:activity" component={LearnMore} />

            <Route
              path="/site/terms"
              exact
              render={(props) => (
                <Content {...props} contentId={TERMSCONDITIONS} />
              )}
            />
            <Route
              path="/site/privacy"
              exact
              render={(props) => (
                <Content {...props} contentId={PRIVACYPOLICY} />
              )}
            />
            <Route path="/site/security" exact component={Security} />
            <Route path="/site/accessibility" exact component={Accessibility} />

            <Route path="/auth/signup" exact>
              {auth.loggedIn ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/auth/login" exact>
              {auth.loggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/auth/reset" exact>
              {auth.loggedIn ? <Redirect to="/" /> : <Reset />}
            </Route>
            <Route path="/auth/token/:token" exact component={Token} />
            <Route path="/auth/newpassword/:token" exact>
              {auth.loggedIn ? <Redirect to="/" /> : <NewPassword />}
            </Route>
            <Route path="/auth/logout" exact component={Logout} />

            <PrivateRoute
              path="/packages/purchase/:packageId"
              exact
              component={PackagePurchasePage}
            />

            <PrivateRoute
              path="/market/view/:marketId"
              exact
              component={MarketItemViewPage}
            />
            <Route path="/market" component={MarketItems} />

            <PrivateRoute
              path="/kitbag/kit/:accountId/new"
              component={KitPage}
            />
            <PrivateRoute
              path="/kitbag/kit/:accountId/edit/:kitId"
              exact
              component={KitPage}
            />
            <PrivateRoute
              path="/kitbag/kit/:accountId/delete/:kitId"
              exact
              component={KitDelete}
            />
            <PrivateRoute path="/kitbag/kit/:accountId" component={KitBag} />

            <PrivateRoute
              path="/kitbag/market/:accountId/new"
              exact
              component={MarketKitPage}
            />
            <PrivateRoute
              path="/kitbag/market/:accountId/add/:kitId/:marketType"
              exact
              component={MarketKitPage}
            />
            <PrivateRoute
              path="/kitbag/market/:accountId/edit/:marketId"
              exact
              component={MarketKitPage}
            />
            <PrivateRoute
              path="/kitbag/market/:accountId/delete/:marketId"
              exact
              component={MarketKitDelete}
            />
            <Route
              path="/show/group/:groupId"
              exact
              component={ShowGroupPage}
            />
            <PrivateRoute
              path="/groups/status/:groupId"
              exact
              component={GroupStatus}
            />
            <PrivateRoute
              path="/groups/:groupId/members/:memberId/delete"
              exact
              component={GroupMemberDelete}
            />
            <PrivateRoute
              path="/groups/:groupId/members/:memberId/:state"
              exact
              component={GroupMemberState}
            />
            <PrivateRoute
              path="/groups/:groupId/members"
              exact
              component={GroupMembers}
            />
            <PrivateRoute
              path="/groups/:groupId/join"
              exact
              component={GroupMemberJoin}
            />
            <PrivateRoute
              path="/groups/:groupId/leave"
              exact
              component={GroupMemberLeave}
            />
            <PrivateRoute path="/groups/:groupId" exact component={GroupPage} />
            <PrivateRoute path="/groups" component={Groups} />

            <PrivateRoute path="/accounts/new" component={AccountPage} />
            <PrivateRoute path="/accounts/join" component={AccountMemberJoin} />
            <PrivateRoute
              path="/accounts/:accountId/invite"
              component={AccountMemberInvite}
            />
            <PrivateRoute
              path="/accounts/:accountId/member/accept/:email/:token"
              component={AccountMemberAccept}
            />
            <PrivateRoute path="/accounts/:accountId" component={AccountPage} />

            <PrivateRoute
              path="/settings/user/:userId/delete"
              component={DeleteUser}
            />
            <PrivateRoute path="/settings/:setting" component={SettingsPage} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default connect(mapStateToProps)(App);
