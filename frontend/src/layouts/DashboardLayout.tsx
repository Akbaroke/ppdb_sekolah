import { Outlet } from 'react-router-dom';
import SideNav from '../components/organisms/SideNav';

export default function DashboardLayout() {
  return (
    <div className="flex gap-5 p-10">
      <SideNav />
      <div className="w-full flex flex-col gap-3">
        <Outlet />
      </div>
    </div>
  );
}
