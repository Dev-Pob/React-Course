import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
