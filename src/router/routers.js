import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import loadable from "@utils/loadable";

const Login = loadable(() => import("@pages/login"));
const Homepage = loadable(() => import("@pages/homepage"));

export default function Routers() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Homepage} />
      </Switch>
    </HashRouter>
  );
}
