import Contents from 'components/Contents/Contents';
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
          {/* <Route path='' element={} */}
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
