import {Navigate, Outlet} from 'react-router-dom';
import jwtUtils from 'utils/jwtUtill';

const PrivateRoute = () => {
  // 토큰값이 만료에 따라 로그인 로그아웃
  const token = localStorage.getItem('token');
  const isAuth = jwtUtils.isAuth(token)
  // const login = true;

  if (!isAuth) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
export default PrivateRoute;
