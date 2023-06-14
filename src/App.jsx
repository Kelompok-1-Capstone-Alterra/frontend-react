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
import Cookies from "js-cookie";

function App() {
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
          loader: async ({ params }) => {
            try {
              const {
                data: { data },
              } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${
                  params.id
                }/detail`,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                }
              );
              return data;
            } catch (error) {
              return null;
            }
          },
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
            try {
              const {
                data: { data },
              } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${
                  params.id
                }/detail`,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                }
              );
              return data;
            } catch (error) {
              return null;
            }
          },
        },
        {
          path: "/admin/products/:id",
          element: <DetailProductPage />,
          loader: async ({ params }) => {
            try {
              const {
                data: { data },
              } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${
                  params.id
                }/detail`,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                }
              );
              return data;
            } catch (error) {
              return null;
            }
          },
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
