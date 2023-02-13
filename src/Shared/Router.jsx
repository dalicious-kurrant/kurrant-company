import {Route, Routes} from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<PrivateRoute />}>
        <Route path="" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
