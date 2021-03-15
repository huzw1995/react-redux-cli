import React from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { routes } from "./routes";

export default function Routers() {
  return <HashRouter>{renderRoutes(routes)}</HashRouter>;
}
