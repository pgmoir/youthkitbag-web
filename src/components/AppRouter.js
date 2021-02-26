import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BundlePurchasePage from './bundles/BundlePurchasePage';
import BundlesPage from './bundles/BundlesPage';
import Content from './site/Content';
import Footer from './includes/Footer';
import GroupMemberLeave from './group/GroupMemberLeave';
import GroupMembers from './group/GroupMembers';
import GroupPage from './group/GroupPage';
import Groups from './group/Groups';
import GroupState from './group/GroupState';
import Home from './Home';
import Kitbag from './kitbag/kit/Kitbag';
import KitbagMemberAccept from './kitbags/KitbagMemberAccept';
import KitbagPage from './kitbags/KitbagPage';
import KitDelete from './kitbag/kit/KitDelete';
import KitPage from './kitbag/kit/KitPage';
import LearnMore from './site/LearnMore';
import Login from './auth/LoginPage';
import Logout from './auth/Logout';
import MarketItemViewPage from './market/MarketItemViewPage';
import MarketKitDelete from './kitbag/market/MarketItemDelete';
import MarketKitEditPage from './kitbag/market/MarketKitEditPage';
import MarketPage from './market/MarketPage';
import NewPassword from './auth/NewPasswordPage';
import PrivateRoute from '../utils/privateRoute';
import Reset from './auth/ResetPage';
import SettingsPage from './kitbag/SettingsPage';
import ShowGroupPage from './show/ShowGroupPage';
import SignUp from './auth/SignUpPage';
import Token from './auth/Token';
import Why from './Why';
import SiteNav from './SiteNav';

const AppRouter = ({ auth }) => {
  return (
    <>
      <SiteNav auth={auth} />
      <div id="wrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/why" exact component={Why} />
          <Route path="/bundles" exact component={BundlesPage} />
          <Route path="/learn/:activity" component={LearnMore} />
          <Route path="/site/:contentId" component={Content} />
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
          <PrivateRoute path="/kitbag/kit/:kitbagId/new" component={KitPage} />
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
            component={MarketKitEditPage}
          />
          <PrivateRoute
            path="/kitbag/market/:kitbagId/add/:kitId/:marketType"
            exact
            component={MarketKitEditPage}
          />
          <PrivateRoute
            path="/kitbag/market/:kitbagId/edit/:marketId"
            exact
            component={MarketKitEditPage}
          />
          <PrivateRoute
            path="/kitbag/market/:kitbagId/delete/:marketId"
            exact
            component={MarketKitDelete}
          />
          <Route path="/show/group/:groupId" exact component={ShowGroupPage} />
          <PrivateRoute
            path="/groups/state/:groupId"
            exact
            component={GroupState}
          />
          <PrivateRoute
            path="/groups/:groupId/members"
            exact
            component={GroupMembers}
          />
          <PrivateRoute
            path="/groups/:groupId/leave"
            exact
            component={GroupMemberLeave}
          />
          <PrivateRoute path="/groups/:groupId" exact component={GroupPage} />
          <PrivateRoute path="/groups" component={Groups} />
          <PrivateRoute path="/kitbags/new" component={KitbagPage} />
          <PrivateRoute
            path="/kitbags/:kitbagId/member/accept/:email/:token"
            component={KitbagMemberAccept}
          />
          <PrivateRoute path="/kitbags/:kitbagId" component={KitbagPage} />
          <PrivateRoute path="/settings/:setting?" component={SettingsPage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default AppRouter;
