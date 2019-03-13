import Bootstrap from "./../layouts/Bootstrap/Bootstrap";
import Dashboard from "./../layouts/Dashboard/Dashboard";

let indexRoutes = [
    {
        path: "/",
        name: "default",
        component: Bootstrap
    },
    {
        path: "/login",
        name: "Login",
        component: Bootstrap
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    }
];

export default indexRoutes;