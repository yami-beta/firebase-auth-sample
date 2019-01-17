import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { UsersPage } from "./pages/UsersPage";

const routes = [
  {
    path: "",
    action: (context: any) => {
      return { content: IndexPage };
    }
  },
  {
    path: "/login",
    action: (context: any) => {
      return { content: LoginPage };
    }
  },
  {
    path: "/logout",
    action: (context: any) => {
      return { content: LogoutPage };
    }
  },
  {
    path: "/users",
    action: (context: any) => {
      return { content: UsersPage };
    }
  }
];

export { routes };
