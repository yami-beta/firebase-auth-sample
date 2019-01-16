import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";

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
  }
];

export { routes };
