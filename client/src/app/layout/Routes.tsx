import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";
import ActivityList from "../../features/activities/dashboard/ActivityList";
import UserProfile from "../../features/profiles/UserProfilePage";
import ActivityData from "../../features/activities/dashboard/ActivityData";
import RegisterForm from "../../features/users/RegisterForm";
import RegisterConfirm from "../../features/users/RegisterConfirm";
import BlogList from "../../features/blog/BlogList";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import CommonForms from "../common/forms/checkoutForms/CommonForms";
import ActivityEditCreateForm from "../../features/activities/dashboard/forms/ActivityEditCreateForm";
import AddBlogForm from "../../features/blog/forms/AddBlogForm";
import EditBlogForm from "../../features/blog/forms/EditBlogForm";
import BlogDetail from "../../features/blog/BlogDetail";
import Files from "../../features/aboutus/Files";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/files", element: <Files/> },
      { path: "/blog", element: <BlogList/> },
      { path: "/loginform", element: <LoginForm /> },
      { path: "/registerform", element: <RegisterForm /> },
      { path: "/account/verifyEmail", element: <RegisterConfirm /> },
      { path: "/activities", element: <ActivityList /> },
      { path: "/userprofile/:username", element: <UserProfile /> },
      { path: "/activitydetail/:id", element: <ActivityData /> },
      { path: "/editactivity/:id", element: <ActivityEditCreateForm /> },
      { path: "/createactivity", element: <ActivityEditCreateForm /> },
      { path: "/form", element: <CommonForms/> },
      { path: "/addblogform", element: <AddBlogForm/> },
      { path: "/editblogform", element: <EditBlogForm/> },
      { path: "/blogdetail/:id", element: <BlogDetail/> },
      { path: "/server-error", element: <ServerError/> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
