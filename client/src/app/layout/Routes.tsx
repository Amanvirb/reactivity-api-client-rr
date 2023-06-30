import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";
import ActivityList from "../../features/activities/dashboard/ActivityList";
import UserProfile from "../../features/profiles/UserProfilePage";
import ActivityData from "../../features/activities/dashboard/ActivityData";
import RegisterForm from "../../features/users/RegisterForm";
import RegisterConfirm from "../../features/users/RegisterConfirm";
import AboutUs from "../../features/aboutus/AboutUs";
import BlogList from "../../features/blog/BlogList";
import Test from "../../features/activities/dashboard/forms/Test";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import CommonForms from "../common/forms/checkoutForms/CommonForms";
import ActivityEditCreateForm from "../../features/activities/dashboard/forms/ActivityEditCreateForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/testing", element: <Test/> },
      { path: "/aboutus", element: <AboutUs/> },
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
      // { path: "/addnewblogpost/:id", element: <AddBlogForm /> },
      { path: "/server-error", element: <ServerError/> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
