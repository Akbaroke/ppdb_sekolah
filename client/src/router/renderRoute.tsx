import { Route } from 'react-router-dom';
import renderRouteWithChildren from './renderRouteWithChildren';
import { DataRouteType } from '.';
import GuestMiddleware from '../middlewares/GuestMiddleware';
import AdminMiddleware from '../middlewares/AdminMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

function renderRoute(route: DataRouteType, index: number) {
  return (
    <Route
      key={index}
      path={route.path}
      element={
        route.middleware ? (
          route.middleware === 'guest' ? (
            <GuestMiddleware>{route.element}</GuestMiddleware>
          ) : route.middleware === 'admin' ? (
            <AdminMiddleware>{route.element}</AdminMiddleware>
          ) : (
            <UserMiddleware>{route.element}</UserMiddleware>
          )
        ) : (
          route.element
        )
      }>
      {route.defaultElement && <Route index element={route.defaultElement} />}
      {route.withChildren?.map((outlet, index) =>
        renderRouteWithChildren(route.path, outlet, index)
      )}
    </Route>
  );
}

export default renderRoute;
