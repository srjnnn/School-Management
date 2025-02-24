class Router {
  static _routes = {
    HOMEPAGE: "/",
    LOGIN: "/LOGIN",
    DASHBOARD: "/DASHBOARD",
    TIMETABLE: "/TIMETABLE",
    TEACHERS: "/TEACHERS",
    STUDENTS: "/STUDENTS",
    NOTES: "/CLASS",
    BUS: "/BUS",
    SETTINGS: "/SETTINGS",
    HELP: "/HELP",
    editTimetable: "/TIMETABLE/EDIT",
    newTimetable: "/NEWTIMETABLE"
  };

  static _routePages = {
    [this._routes.HOMEPAGE]: "home-page",
    [this._routes.LOGIN]: "login-page",
    [this._routes.DASHBOARD]: "my-dashboard",
    [this._routes.TIMETABLE]: "my-timetable",
    [this._routes.newTimetable]: "my-newTimetable",
    [this._routes.TEACHERS]: "my-teachers",
    [this._routes.STUDENTS]: "students-page",
    [this._routes.NOTES]: "classnotes-page",
    [this._routes.BUS]: "busdetails-page",
    [this._routes.SETTINGS]: "settings-page",
    [this._routes.HELP]: "help-page"
  };

  static _customElems = {
    LOGIN: "login-page",
    DASHBOARD: "my-dashboard",
    TIMETABLE: "timetable-page",
    TEACHERS: "my-teachers",
    CLASSNOTES: "classnotes-page",
    BUSDETAILS: "busdetails-page",
    SETTINGS: "settings-page",
    HELP: "help-page",
    LOGOUT: "log-out",
    FORBIDDEN: "forbidden-page"
  };

  static _privateCustomElems = {
    STUDENTS: "students-page",
    addTimetable: "new-timetable",
    addTeachers: "add-newteachers",
    Edit_Teachers: "edit-teachers",
    addNotes: "add-notes",
    addStudents: "addnew-students",
    Edit_Students: "edit-students",
    Attendence: "attendence-page"
  };

  static getMainPage = () => {
    const path = window.location.pathname;
    const firstRoute = path.split("/").filter(Boolean)[0];
    return this._routePages[firstRoute];
  };

  // method to identify the change in the routes 
  static identifyRoutesChange(hostShadowroot) {
    window.addEventListener('popstate', (event) => {
      this.chagePage(hostShadowroot);
    });
  }

  // change the page based on the routes changed 
  static chagePage(hostShadowroot) {
    const pathName = window.location.pathname.slice(1);
    Object.keys(this._customElems).forEach((key) => {
      if (key === pathName) {
        const mainContentContainer = hostShadowroot.querySelector('#main-content-container');
        mainContentContainer.replaceChildren();
        const pageElement = document.createElement(this._customElems[key]);
        mainContentContainer.appendChild(pageElement);
        this._changeSidebarClasslist(hostShadowroot, pathName);
      }
    });
  }

  // Change the sidebar classList based on the routes
  static _changeSidebarClasslist(shadowRoot, path) {
    const sideBar = shadowRoot.querySelector('my-sidebar');
    const sideBarShadowRoot = sideBar.shadowRoot;
    const activeButtons = sideBarShadowRoot.querySelectorAll('.button.active');
    activeButtons.forEach(activeButtons => {
      activeButtons.classList.remove('active');
    });
    const caseSensitiveButtons = path.toLowerCase();
    const targetedButton = sideBar.shadowRoot.querySelector(`#${caseSensitiveButtons}`);
    targetedButton.classList.add('active');
  }
}

export default Router;