import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/hoc/PrivateRoute";
import ProtectedLoginRoute from "./components/hoc/ProtectedLoginRoute";

import GuestLayout from "./components/layouts/GuestLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import Error504 from "./pages/errors/504";
import Error500 from "./pages/errors/500";
import Error404 from "./pages/errors/404";
import Error403 from "./pages/errors/403";
import Error401 from "./pages/errors/401";

import Login from "./pages/login/Login";
import LandingPage from "./pages/landing_page/LandingPage";
import ArticlePage from "./pages/article/ArticlePage";
import CreateArticlePage from "./pages/article/CreateArticlePage";
import DetailArticlePage from "./pages/article/DetailArticlePage";
import UpdateArticlePage from "./pages/article/UpdateArticlePage";

import CreatePlantPage from "./pages/plant/CreatePlantPage";
import PlantPage from "./pages/plant/PlantPage";
import DetailPlantPage from "./pages/plant/DetailPlantPage";
import UpdatePlantPage from "./pages/plant/UpdatePlantPage";

import ProductsPage from "./pages/product/ProductsPage";
import CreateProductPage from "./pages/product/CreateProductPage";
import DetailProductPage from "./pages/product/DetailProductPage";
import UpdateProductPage from "./pages/product/UpdateProductPage";
import CreateWeatherPage from "./pages/weather/CreateWeatherPage";
import DetailWeatherPage from "./pages/weather/DetailWeatherPage";
import UpdateWeatherPage from "./pages/weather/UpdateWeatherPage";
import WeatherManagementPage from "./pages/weather/WeatherManagementPage";
import OverviewPage from "./pages/overview/OverviewPage";
import SuggestionPage from "./pages/suggestion/SuggestionPage";

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
        path: "/admin/suggestions",
        element: <SuggestionPage />,
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
    path: "/error504",
    element: <Error504 to={"/"} />,
  },
  {
    path: "/error500",
    element: <Error500 to={"/"} />,
  },
  {
    path: "/error403",
    element: <Error403 />,
  },
  {
    path: "/error401",
    element: <Error401 />,
  },
  {
    path: "*",
    element: <Error404 to={"/"} />,
  },
]);

export default router;
