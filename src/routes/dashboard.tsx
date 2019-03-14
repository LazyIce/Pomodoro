import Dashboard from "../views/Dashboard";
import TableList from "../views/TableList";
import UserProfile from "../views/UserProfile";
import Projects from "../views/Projects";

const dashboardRoutes = [
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "pe-7s-note2",
    component: Projects
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;