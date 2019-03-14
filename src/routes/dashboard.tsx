import UserProfile from "../views/UserProfile";
import Projects from "../views/Project";

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
  { redirect: true, path: "/", to: "/projects", name: "Project" }
];

export default dashboardRoutes;