class Router {
  static _routes = {
    HOMEPAGE: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    TIME_TABLE: "/time-table",
    TEACHERS: "/teachers",
    STUDENTS: "/students",
    NOTES: "/notes",
    BUS: "/bus",
    LOCATION: "/location",
    SETTINGS: "/settings",
    HELP: "/help",
  };

  static _routePages = {
    [this._routes.HOMEPAGE]: "home-page",
    [this._routes.LOGIN]: "login-page",
  };

  static getMainPage = () => {
    const path = window.location.pathname;
    const firstRoute = path.split("/").filter(Boolean)[0];
    console.log('page', path, firstRoute);

    return this._routePages[firstRoute];
  };
}

export default Router;
