import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { ContentTypes } from '../enums/contentTypes.enum';
import Accessibility from './site/Accessibility';
import BundlePurchasePage from './bundles/BundlePurchasePage';
import BundlesPage from './bundles/BundlesPage';
import Content from './site/Content';
import DeleteUser from './kitbag/DeleteUser';
import Footer from './includes/Footer';
import GroupMemberDelete from './group/GroupMemberDelete';
import GroupMemberJoin from './group/GroupMemberJoin';
import GroupMemberLeave from './group/GroupMemberLeave';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';
import GroupPage from './group/GroupPage';
import Groups from './group/Groups';
import GroupState from './group/GroupState';
import Header from './includes/Header';
import HelpPage from './site/HelpPage';
import history from '../utils/history';
import Home from './Home';
import Kitbag from './kitbag/kit/Kitbag';
import KitbagMemberAccept from './kitbags/KitbagMemberAccept';
import KitbagMemberInvite from './kitbags/KitbagMemberInvite';
import KitbagMemberJoin from './kitbags/KitbagMemberJoin';
import KitbagPage from './kitbags/KitbagPage';
import KitDelete from './kitbag/kit/KitDelete';
import KitPage from './kitbag/kit/KitPage';
import LearnMore from './site/LearnMore';
import Login from './auth/LoginPage';
import Logout from './auth/Logout';
import MarketItemViewPage from './market/MarketItemViewPage';
import MarketKitDelete from './kitbag/market/MarketItemDelete';
import MarketKitPage from './kitbag/market/MarketKitPage';
import MarketPage from './market/MarketPage';
import MediaPage from './site/MediaPage';
import NewPassword from './auth/NewPasswordPage';
import PrivateRoute from '../utils/privateRoute';
import Reset from './auth/ResetPage';
import Security from './site/Security';
import SettingsPage from './kitbag/SettingsPage';
import ShowGroupPage from './show/ShowGroupPage';
import SignUp from './auth/SignUpPage';
import Token from './auth/Token';
import User from './auth/User';
import Why from './Why';

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
            className="section pt-5"
          >
            <noscript>
              You need to enable JavaScript to run this application.
            </noscript>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/help" exact component={HelpPage} />
              <Route path="/media" exact component={MediaPage} />
              <Route path="/why" exact component={Why} />
              <Route path="/bundles" exact component={BundlesPage} />

              <Route path="/learn/:activity" component={LearnMore} />

              <Route
                path="/site/terms"
                exact
                render={(props) => (
                  <Content
                    {...props}
                    contentId={ContentTypes.TERMSCONDITIONS}
                  />
                )}
              />
              <Route
                path="/site/privacy"
                exact
                render={(props) => (
                  <Content {...props} contentId={ContentTypes.PRIVACYPOLICY} />
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
              <Route
                path="/auth/newpassword/:token"
                exact
                render={(props) => {
                  if (auth.loggedIn) {
                    return <Redirect to="/" />;
                  } else {
                    return <NewPassword {...props} />;
                  }
                }}
              />
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
              <Route path="/market" component={MarketPage} />

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
                path="/settings/:setting?"
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
