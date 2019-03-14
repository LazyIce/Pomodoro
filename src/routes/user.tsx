import Project from "../views/Project";

const userRoutes = [
  {
    path: "/project",
    name: "Projects",
    icon: "pe-7s-note2",
    component: Project
  },
  { redirect: true, path: "/", to: "/project", name: "Project" }
];

export default userRoutes;