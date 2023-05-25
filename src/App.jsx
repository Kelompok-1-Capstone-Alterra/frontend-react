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
          element: <h1>OverviewPage</h1>,
        },
        {
          path: "/admin/plants",
          element: <h1>PlantPage</h1>,
        },
        {
          path: "/admin/plants/create",
          element: <h1>CreatePlantPage</h1>,
        },
        {
          path: "/admin/plants/update/:id",
          element: <h1>UpdatePlantPage</h1>,
        },
        {
          path: "/admin/plants/:id",
          element: <h1>DetailPlantPage</h1>,
        },
        {
          path: "/admin/products",
          element: <h1>ProductPage</h1>,
        },
        {
          path: "/admin/products/create",
          element: <h1>CreateProductPage</h1>,
        },
        {
          path: "/admin/products/update/:id",
          element: <h1>UpdateProductPage</h1>,
        },
        {
          path: "/admin/products/:id",
          element: <h1>DetailProductPage</h1>,
        },
        {
          path: "/admin/weathers",
          element: <h1>WeatherPage</h1>,
        },
        {
          path: "/admin/weathers/create",
          element: <h1>CreateWeatherPage</h1>,
        },
        {
          path: "/admin/weathers/update/:id",
          element: <h1>UpdateWeatherPage</h1>,
        },
        {
          path: "/admin/weathers/:id",
          element: <h1>DetailWeatherPage</h1>,
        },
        {
          path: "/admin/articles",
          element: <h1>ArticlePage</h1>,
        },
        {
          path: "/admin/articles/create",
          element: <h1>CreateArticlePage</h1>,
        },
        {
          path: "/admin/articles/update/:id",
          element: <h1>UpdateArticlePage</h1>,
        },
        {
          path: "/admin/articles/:id",
          element: <h1>DetailArticlePage</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
