import Project from "../views/Project";
import Pomodoro from "../views/Pomodoro";

const userRoutes = [
  {
    path: "/dashboard",
    name: "Projects",
    icon: "pe-7s-note2",
    component: Project
  },
  {
    path: "/pomodoro",
    name: "Pomodoro",
    icon: "pe-7s-plus",
    component: Pomodoro
  },
  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    name: "Project"
  }
];

export default userRoutes;