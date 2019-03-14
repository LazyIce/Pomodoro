import UserProfile from "../views/UserProfile";

const adminRoutes = [
    {
      path: "/user",
      name: "User Profile",
      icon: "pe-7s-user",
      component: UserProfile
    },
    { redirect: true, path: "/", to: "/user", name: "UserProfile" }
]

export default adminRoutes;