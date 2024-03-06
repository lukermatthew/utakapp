import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AppLayout from "./components/AppLayout";
import CreateProduct from "./features/products/CreateProduct";
import UpdateProduct from "./features/products/UpdateProduct";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/create",
        element: <CreateProduct />,
      },
      {
        path: "/products/edit/:id",
        element: <UpdateProduct />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
