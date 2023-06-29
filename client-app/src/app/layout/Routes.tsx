import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";

export const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        // { path: "/", element: <HomePage /> },
        // { path: "/blogpostpage/:id", element: <BlogPostPage /> },
        // { path: "/addnewblogpost/:id", element: <AddBlogForm /> },
        // { path: "*", element: <NotFound /> },
      ],
    },
  ];
  
  export const router = createBrowserRouter(routes);