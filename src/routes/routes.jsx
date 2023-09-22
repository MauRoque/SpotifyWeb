import { useRoutes } from "react-router-dom";

import GenericRoutes from "./GenericRoutes";

function RoutesApp() {
  return useRoutes([...GenericRoutes]);
}

export default RoutesApp;
