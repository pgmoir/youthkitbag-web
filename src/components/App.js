import React from 'react';
import { Link, Router, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PrivateRoute from '../utils/privateRoute';
import history from '../utils/history';
import User from './auth/User';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Home from './Home';
import Why from './Why';
import Bundles from './Bundles';
import Content from './site/Content';
import Security from './site/Security';
import Accessibility from './site/Accessibility';
import SignUp from './auth/SignUpPage';
import Login from './auth/LoginPage';
import Reset from './auth/ResetPage';
import NewPassword from './auth/NewPasswordPage';
import Logout from './auth/Logout';
import Token from './auth/Token';
import BundlePurchasePage from './BundlePurchasePage';
import Groups from './group/Groups';
import GroupPage from './group/GroupPage';
import ShowGroupPage from './show/ShowGroupPage';
import GroupState from './group/GroupState';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';
import GroupMemberJoin from './group/GroupMemberJoin';
import GroupMemberLeave from './group/GroupMemberLeave';
import Kitbag from './kitbag/kit/Kitbag';
import KitPage from './kitbag/kit/KitPage';
import KitDelete from './kitbag/kit/KitDelete';
import MarketKitPage from './kitbag/market/MarketKitPage';
import MarketItems from './market/MarketItems';
import MarketItemViewPage from './market/MarketItemViewPage';
import MarketKitDelete from './kitbag/market/MarketKitDelete';
import SettingsPage from './kitbag/SettingsPage';
import KitbagPage from './kitbags/KitbagPage';
import KitbagMemberInvite from './kitbags/KitbagMemberInvite';
import KitbagMemberAccept from './kitbags/KitbagMemberAccept';
import KitbagMemberJoin from './kitbags/KitbagMemberJoin';
import LearnMore from './learn/LearnMore';
import GroupMemberDelete from './group/GroupMemberDelete';
import DeleteUser from './kitbag/DeleteUser';
import { connect } from 'react-redux';
import { TERMSCONDITIONS, PRIVACYPOLICY } from './site/content-types';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const App = ({ auth }) => {
  return (
    <>
      <Helmet>
        <title>
          YouthKitbag - Inventory, Trade, Aquire, Reporting for all youth kit
        </title>
      </Helmet>
      <Router history={history}>
        <User />
        <div id="wrapper">
          <Header />
          <section
            id="main"
            aria-label="main body of content plus related links and features"
            className="section"
          >
            <noscript>
              You need to enable JavaScript to run this application.
            </noscript>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/why" exact component={Why} />
              <Route path="/bundles" exact component={Bundles} />

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
              <Route
                path="/site/accessibility"
                exact
                component={Accessibility}
              />

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
                path="/bundles/purchase/:bundleId"
                exact
                component={BundlePurchasePage}
              />

              <PrivateRoute
                path="/market/view/:marketId"
                exact
                component={MarketItemViewPage}
              />
              <Route path="/market" component={MarketItems} />

              <PrivateRoute
                path="/kitbag/kit/:kitbagId/new"
                component={KitPage}
              />
              <PrivateRoute
                path="/kitbag/kit/:kitbagId/edit/:kitId"
                exact
                component={KitPage}
              />
              <PrivateRoute
                path="/kitbag/kit/:kitbagId/delete/:kitId"
                exact
                component={KitDelete}
              />
              <PrivateRoute path="/kitbag/kit/:kitbagId" component={Kitbag} />

              <PrivateRoute
                path="/kitbag/market/:kitbagId/new"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/:kitbagId/add/:kitId/:marketType"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/:kitbagId/edit/:marketId"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/:kitbagId/delete/:marketId"
                exact
                component={MarketKitDelete}
              />
              <Route
                path="/show/group/:groupId"
                exact
                component={ShowGroupPage}
              />
              <PrivateRoute
                path="/groups/state/:groupId"
                exact
                component={GroupState}
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
              <PrivateRoute
                path="/groups/:groupId"
                exact
                component={GroupPage}
              />
              <PrivateRoute path="/groups" component={Groups} />

              <PrivateRoute path="/kitbags/new" component={KitbagPage} />
              <PrivateRoute path="/kitbags/join" component={KitbagMemberJoin} />
              <PrivateRoute
                path="/kitbags/:kitbagId/invite"
                component={KitbagMemberInvite}
              />
              <PrivateRoute
                path="/kitbags/:kitbagId/member/accept/:email/:token"
                component={KitbagMemberAccept}
              />
              <PrivateRoute path="/kitbags/:kitbagId" component={KitbagPage} />

              <PrivateRoute
                path="/settings/user/:userId/delete"
                component={DeleteUser}
              />
              <PrivateRoute
                path="/settings/:setting"
                component={SettingsPage}
              />
            </Switch>
          </section>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default connect(mapStateToProps)(App);
