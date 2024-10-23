import { Route } from 'react-router-dom';
import { OutletChildrenType } from '.';

function renderRouteWithChildren(
  parentPath: string,
  outlet: OutletChildrenType,
  index: number
) {
  return (
    <Route
      path={parentPath + outlet.path}
      element={outlet.element}
      key={index}
    />
  );
}

export default renderRouteWithChildren;
