import Boostrap from "./../layouts/Bootstrap/Bootstrap";
import Dashboard from "./../layouts/Dashboard/Dashboard";

let indexRoutes = [
    {
        path: "/login",
        name: "Login",
        component: Boostrap
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    }
];

export default indexRoutes;