import { Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.svg';


const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default HomeLayout;