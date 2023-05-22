import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

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
          element: <AdminPage />,
        },
        {
          path: "/admin/tanaman",
          element: <h1>Tanaman Page</h1>,
        },
        {
          path: "/admin/produk",
          element: <h1>Produk Page</h1>,
        },
        {
          path: "/admin/manajemen-cuaca",
          element: <h1>Manajemen Cuaca Page</h1>,
        },
        {
          path: "/admin/manajemen-artikel",
          element: <h1>Manajemen Artikel Page</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
