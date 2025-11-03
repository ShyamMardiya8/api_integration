import Table from "./components/Table";
import Login from "./screens/Login";
import SignUp from "./screens/signup";

export const routes = [
  {
    component: SignUp,
    path: "/signup",
  },
  {
    component: Login,
    path: "/",
  },
  {
    component: Table,
    path: "/table",
  },
];
