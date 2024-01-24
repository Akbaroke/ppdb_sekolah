import { Route } from 'react-router-dom';
import renderRouteWithChildren from './renderRouteWithChildren';
import { DataRouteType } from '.';

function renderRoute(route: DataRouteType, index: number) {
  return (
    <Route
      key={index}
      path={route.path}
      element={
        route.middleware ? (
          route.middleware === 'guest' ? (
            <>{route.element}</>
          ) : (
            <>{route.element}</>
          )
        ) : (
          route.element
        )
      }>
      {route.withChildren?.map((outlet, index) =>
        renderRouteWithChildren(route.path, outlet, index)
      )}
    </Route>
  );
}

export default renderRoute;
