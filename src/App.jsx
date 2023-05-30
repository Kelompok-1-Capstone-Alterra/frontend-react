import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CreatePlantPage from "./pages/CreatePlantPage";
import PlantPage from "./pages/PlantPage";
import DetailPlantPage from "./pages/DetailPlantPage";
import UpdatePlantPage from "./pages/UpdatePlantPage";

import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";

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
          element: <PlantPage />,
        },
        {
          path: "/admin/plants/create",
          element: <CreatePlantPage />,
        },
        {
          path: "/admin/plants/update/:id",
          element: <UpdatePlantPage />,
        },
        {
          path: "/admin/plants/:id",
          element: <DetailPlantPage />,
        },
        {
          path: "/admin/products",
          element: <ProductsPage />,
        },
        {
          path: "/admin/products/create",
          element: <CreateProductPage />,
        },
        {
          path: "/admin/products/update/:id",
          element: <UpdateProductPage />,
          loader: async ({ params }) => {
            const { data } = await axios.get(
              `https://6428ef045a40b82da4c9fa2d.mockapi.io/api/products/${params.id}`
            );
            return data;
          },
        },
        {
          path: "/admin/products/:id",
          element: <DetailProductPage />,
          loader: async ({ params }) => {
            const { data } = await axios.get(
              `https://6428ef045a40b82da4c9fa2d.mockapi.io/api/products/${params.id}`
            );
            return data;
          },
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
