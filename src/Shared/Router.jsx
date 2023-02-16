import CompanyMembershipList from 'components/Contents/CompanyMembershipList/CompanyMembershipList';
import Contents from 'components/Contents/Contents';
import Notice from 'components/Contents/Notice/Notice';
import NotYetContents from 'components/Contents/NotYetContents/NotYetContents';
import UserStatus from 'components/Contents/UserStatus/UserStatus';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<PrivateRoute />}>
        <Route path="" element={<MainPage />}>
          <Route path="user_status" element={<UserStatus />} />
          <Route path="notice" element={<Notice />} />
          <Route
            path="company_membership_list"
            element={<CompanyMembershipList />}
          />
          <Route path="*" element={<NotYetContents />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
