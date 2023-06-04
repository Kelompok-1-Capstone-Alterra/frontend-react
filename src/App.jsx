import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import PrivateRoute from "./components/hoc/PrivateRoute";
import ProtectedLoginRoute from "./components/hoc/ProtectedLoginRoute";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticle from "./pages/CreateArticle";
import DetailArticle from "./pages/DetailArticle";
import UpdateArticle from "./pages/UpdateArticle";

import CreatePlantPage from "./pages/CreatePlantPage";
import PlantPage from "./pages/PlantPage";
import DetailPlantPage from "./pages/DetailPlantPage";
import UpdatePlantPage from "./pages/UpdatePlantPage";

import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import OverviewPage from "./pages/OverviewPage";

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
          element: <ProtectedLoginRoute component={Login} />,
        },
      ],
    },
    {
      path: "/admin",
      element: <PrivateRoute component={AdminLayout} />,
      children: [
        {
          path: "/admin",
          element: <OverviewPage />,
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
          element: <ArticlePage />,
        },
        {
          path: "/admin/articles/create",
          element: <CreateArticle />,
        },
        {
          path: "/admin/articles/update/:id",
          element: <UpdateArticle />,
        },
        {
          path: "/admin/articles/:id",
          element: <DetailArticle />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
