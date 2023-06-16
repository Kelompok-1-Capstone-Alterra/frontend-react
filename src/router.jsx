import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/hoc/PrivateRoute";
import ProtectedLoginRoute from "./components/hoc/ProtectedLoginRoute";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import DetailArticlePage from "./pages/DetailArticlePage";
import UpdateArticlePage from "./pages/UpdateArticlePage";

import CreatePlantPage from "./pages/CreatePlantPage";
import PlantPage from "./pages/PlantPage";
import DetailPlantPage from "./pages/DetailPlantPage";
import UpdatePlantPage from "./pages/UpdatePlantPage";

import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import CreateWeatherPage from "./pages/CreateWeatherPage";
import DetailWeatherPage from "./pages/DetailWeatherPage";
import UpdateWeatherPage from "./pages/UpdateWeatherPage";
import WeatherManagementPage from "./pages/WeatherManagementPage";
import OverviewPage from "./pages/OverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLoginRoute component={GuestLayout} />,
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
      },
      {
        path: "/admin/products/:id",
        element: <DetailProductPage />,
      },
      {
        path: "/admin/weathers",
        element: <WeatherManagementPage />,
      },
      {
        path: "/admin/weathers/create",
        element: <CreateWeatherPage />,
      },
      {
        path: "/admin/weathers/update/:id",
        element: <UpdateWeatherPage />,
      },
      {
        path: "/admin/weathers/:id",
        element: <DetailWeatherPage />,
      },
      {
        path: "/admin/articles",
        element: <ArticlePage />,
      },
      {
        path: "/admin/articles/create",
        element: <CreateArticlePage />,
      },
      {
        path: "/admin/articles/update/:id",
        element: <UpdateArticlePage />,
      },
      {
        path: "/admin/articles/:id",
        element: <DetailArticlePage />,
      },
    ],
  },
  {
    path: "/error500",
    element: <h1>500 Internal Server Error</h1>,
  },
  {
    path: "/error404",
    element: <h1>404 Not Found</h1>,
  },
  {
    path: "/error403",
    element: <h1>403 Forbidden</h1>,
  },
  {
    path: "/error401",
    element: <h1>401 Unauthorized</h1>,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;