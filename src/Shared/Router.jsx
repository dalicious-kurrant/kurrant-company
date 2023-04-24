import CompanyInfo from 'components/Contents/CompanyInfo/CompanyInfo';
import CompanyMembership from 'components/Contents/CompanyMembership/CompanyMembership';
import Contents from 'components/Contents/Contents';
import Notice from 'components/Contents/Notice/Notice';
import NotYetContents from 'components/Contents/NotYetContents/NotYetContents';
import UserStatus from 'components/Contents/UserStatus/UserStatus';
import Calculate from '../Pages/Calculate';
import OrderPage from '../Pages/orderPage/OrderPage';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import PrivateRoute from './PrivateRoute';
import OrderDetailPage from '../Pages/orderPage/OrderDetailPage';
import AdditionalOrder from 'Pages/additionalOrderPage/additionalOrder/AdditionalOrder';
import CompanyCalc from 'Pages/Calculatiton/CompanyCalc';
import ClientDetail from 'Pages/Calculatiton/components/CalcDetail';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<MainPage />}>
          <Route path="" element={<NotYetContents />} />
          <Route path="user-status" element={<UserStatus />} />
          <Route path="notice" element={<Notice />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="order/orderDetail/:code" element={<OrderDetailPage />} />
          <Route path="additionalOrder" element={<AdditionalOrder />} />
          <Route path="company-membership" element={<CompanyMembership />} />
          <Route path="company-info" element={<CompanyInfo />} />
          <Route path="calc" element={<CompanyCalc />} />
          <Route path="calc/detail" element={<ClientDetail />} />
          <Route path="*" element={<NotYetContents />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
