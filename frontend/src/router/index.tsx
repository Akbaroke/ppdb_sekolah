import { Route, Routes } from 'react-router';
import Login from '../pages/Login';
type DataRouteType = {
  path: string;
  element: React.ReactElement;
  middleware: 'guest' | 'user';
};

export default function Root() {
  const dataRoute: DataRouteType[] = [
    {
      path: '/login',
      element: <Login />,
      middleware: 'guest',
    },
  ];

  return (
    <Routes>
      {dataRoute.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
