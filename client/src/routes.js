import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

import App from "~/containers/App/App";
import Login from "~/containers/Login/Login";
import Home from "~/containers/Home/Home";
import MyPortfolio from "~/containers/MyPortfolio/MyPortfolio";

const isAuthenticated = connectedRouterRedirect({
  redirectPath: "/login",
  authenticatedSelector: state => state.auth.isAuthenticated,
  wrapperDisplayName: "UserIsAuthenticated"
});

const isNotAuthenticated = connectedRouterRedirect({
  redirectPath: "/",
  authenticatedSelector: state => state.auth.isAuthenticated,
  wrapperDisplayName: "UserIsNotAuthenticated",
  allowRedirectBack: false
});

const routes = [
  {
    component: App,
    routes: [
      { path: "/", exact: true, component: Home },
      { path: "/login", component: Login },
      { path: "/portfolio", component: isAuthenticated(MyPortfolio) }
    ]
  }
];

export default routes;
