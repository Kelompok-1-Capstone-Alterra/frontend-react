import { RouterProvider } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-loading-skeleton/dist/skeleton.css";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;