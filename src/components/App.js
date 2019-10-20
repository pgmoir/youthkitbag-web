import React from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../helpers/privateRoute';
import history from '../helpers/history';

import User from './auth/User';
import Header from './includes/Header';
import Footer from './includes/Footer';

import Home from './Home';
import Why from './Why';
import Pricing from './Pricing';
import Terms from './site/Terms';
import Privacy from './site/Privacy';
import Security from './site/Security';
import Accessibility from './site/Accessibility';

import SignUp from './auth/SignUpPage';
import Login from './auth/LoginPage';
import Reset from './auth/ResetPage';
import NewPassword from './auth/NewPasswordPage';
import Logout from './auth/Logout';
import Token from './auth/Token';

import PurchaseSubscriptionPage from './PurchaseSubscriptionPage';

import Groups from './group/Groups';
import GroupPage from './group/GroupPage';
import GroupStatus from './group/GroupStatus';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';
import GroupMemberJoin from './group/GroupMemberJoin';
import GroupMemberLeave from './group/GroupMemberLeave';

import ProfilePage from './account/ProfilePage';

import KitBag from './kitbag/kit/KitBag';
import KitPage from './kitbag/kit/KitPage';
import KitDelete from './kitbag/kit/KitDelete';

import MarketKits from './kitbag/market/MarketKits';
import MarketKitPage from './kitbag/market/MarketKitPage';
import MarketKitDelete from './kitbag/market/MarketKitDelete';

import MarketItems from './market/MarketItems';
import MarketItemViewPage from './market/MarketItemViewPage';

import AccountPage from './account/AccountPage';
import PackagePage from './account/PackagePage';
import BadgesPage from './account/BadgesPage';
import SettingsPage from './account/SettingsPage';

class App extends React.Component {
  render() {
    return (
      <div className="react-body">
        <Router history={history}>
          <User />
          <Header />
          <main>
            <noscript>You need to enable JavaScript to run this app.</noscript>
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
              <Route path="/pricing" exact component={Pricing} />

              <Route path="/site/terms" exact component={Terms} />
              <Route path="/site/privacy" exact component={Privacy} />
              <Route path="/site/security" exact component={Security} />
              <Route
                path="/site/accessibility"
                exact
                component={Accessibility}
              />

              <Route path="/auth/signup" exact component={SignUp} />
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/reset" exact component={Reset} />
              <Route path="/auth/token/:token" exact component={Token} />
              <Route
                path="/auth/newpassword/:key"
                exact
                component={NewPassword}
              />
              <Route path="/auth/logout" exact component={Logout} />

              <PrivateRoute
                path="/purchase/subscription/:subscriptionId"
                exact
                component={PurchaseSubscriptionPage}
              />

              <PrivateRoute
                path="/market/view/:marketId"
                exact
                component={MarketItemViewPage}
              />
              <Route path="/market" component={MarketItems} />

              <PrivateRoute path="/kitbag/kit/new" component={KitPage} />
              <PrivateRoute
                path="/kitbag/kit/edit/:kitId"
                exact
                component={KitPage}
              />
              <PrivateRoute
                path="/kitbag/kit/delete/:kitId"
                exact
                component={KitDelete}
              />
              <PrivateRoute path="/kitbag/kit" component={KitBag} />

              <PrivateRoute
                path="/kitbag/market/new"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/add/:kitId/:marketType"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/edit/:marketId"
                exact
                component={MarketKitPage}
              />
              <PrivateRoute
                path="/kitbag/market/delete/:marketId"
                exact
                component={MarketKitDelete}
              />
              <PrivateRoute path="/kitbag/market" component={MarketKits} />

              <PrivateRoute
                path="/settings/groups/new"
                exact
                component={GroupPage}
              />
              <PrivateRoute
                path="/settings/groups/status/:groupId"
                exact
                component={GroupStatus}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/members/:memberId/:state"
                exact
                component={GroupMemberState}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/members"
                exact
                component={GroupMembers}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/join"
                exact
                component={GroupMemberJoin}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/leave"
                exact
                component={GroupMemberLeave}
              />
              <PrivateRoute
                path="/settings/groups/:groupId"
                exact
                component={GroupPage}
              />
              <PrivateRoute path="/settings/groups" component={Groups} />

              <PrivateRoute
                path="/settings/account"
                exact
                component={AccountPage}
              />
              <PrivateRoute path="/settings" exact component={SettingsPage} />
              <PrivateRoute
                path="/settings/account/profile"
                exact
                component={ProfilePage}
              />
              <PrivateRoute
                path="/settings/account/package"
                exact
                component={PackagePage}
              />
              <PrivateRoute
                path="/settings/account/badges"
                exact
                component={BadgesPage}
              />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
