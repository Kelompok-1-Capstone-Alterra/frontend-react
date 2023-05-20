import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <h1>Admin Page</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
