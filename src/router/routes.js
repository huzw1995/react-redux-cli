import loadable from "@utils/loadable";

const Login = loadable(() => import("@pages/login"));
const Homepage = loadable(() => import("@pages/homepage"));

export const routes = [
  {
    path: "/",
    component: Homepage,
    exact: true,
  },
  {
    path: "/Login",
    component: Login,
    exact: true,
  },
];
