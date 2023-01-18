import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import PrivateRoutes from '../utils/privateRoute';
import Reset from './auth/ResetPage';
import SettingsPage from './kitbag/SettingsPage';
import ShowGroupPage from './show/ShowGroupPage';
import SignUp from './auth/SignUpPage';
import Token from './auth/Token';
import Why from './Why';
import SiteNav from './SiteNav';
import ProtectedRoute from '../utils/protectedRoute';

const AppRouter = ({ auth }) => {
  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  return (
    <>
      <SiteNav auth={auth} />
      <div id="wrapper">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/why" exact element={<Why />} />
          <Route path="/bundles" exact element={<BundlesPage />} />
          <Route path="/learn/:activity" element={<LearnMore />} />
          <Route path="/site/:contentId" element={<Content />} />
          <Route
            path="/auth/signup"
            exact
            element={auth.loggedIn ? <Redirect to="/" /> : <SignUp />}
          />
          <Route
            path="/auth/login"
            exact
            element={auth.loggedIn ? <Redirect to="/" /> : <Login />}
          />
          <Route
            path="/auth/reset"
            exact
            element={auth.loggedIn ? <Redirect to="/" /> : <Reset />}
          />
          <Route path="/auth/token/:token" exact element={<Token />} />
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
          <Route path="/auth/logout" exact element={<Logout />} />
          <Route element={<PrivateRoutes />}>
            <Route
              exact
              path="/bundles/purchase/:bundleId"
              element={<BundlePurchasePage />}
            />

            <Route
              path="/market/view/:marketId"
              exact
              element={<MarketItemViewPage />}
            />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/kitbag/kit/:kitbagId/new" element={<KitPage />} />
            <Route
              path="/kitbag/kit/:kitbagId/edit/:kitId"
              exact
              element={<KitPage />}
            />
            <Route
              path="/kitbag/kit/:kitbagId/delete/:kitId"
              exact
              element={<KitDelete />}
            />
            <Route path="/kitbag/kit/:kitbagId" element={<Kitbag />} />
            <Route
              path="/kitbag/market/:kitbagId/new"
              exact
              element={<MarketKitEditPage />}
            />
            <Route
              path="/kitbag/market/:kitbagId/add/:kitId/:marketType"
              exact
              element={<MarketKitEditPage />}
            />
            <Route
              path="/kitbag/market/:kitbagId/edit/:marketId"
              exact
              element={<MarketKitEditPage />}
            />
            <Route
              path="/kitbag/market/:kitbagId/delete/:marketId"
              exact
              element={<MarketKitDelete />}
            />
            <Route
              path="/show/group/:groupId"
              exact
              element={<ShowGroupPage />}
            />
            <Route
              path="/groups/state/:groupId"
              exact
              element={<GroupState />}
            />
            <Route
              path="/groups/:groupId/members"
              exact
              element={<GroupMembers />}
            />
            <Route
              path="/groups/:groupId/leave"
              exact
              element={<GroupMemberLeave />}
            />
            <Route path="/groups/:groupId" exact element={<GroupPage />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/kitbags/new" element={<KitbagPage />} />
            <Route
              path="/kitbags/:kitbagId/member/accept/:email/:token"
              element={<KitbagMemberAccept />}
            />
            <Route path="/kitbags/:kitbagId" element={<KitbagPage />} />
          </Route>

          <Route
            path="/settings/:setting?"
            element={
              <ProtectedRoute auth={auth}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRouter;
