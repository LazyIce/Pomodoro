import Project from "../views/Project";

const userRoutes = [
  {
    path: "/dashboard",
    name: "Projects",
    icon: "pe-7s-note2",
    component: Project
  },
  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    name: "Project"
  }
];

export default userRoutes;