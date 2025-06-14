import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import AddProduct from "./components/AddProduct.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ProductData from "./components/ProductData.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Cart from "./components/Cart.jsx";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/product/:id",
    element: <ProductData />,
  },
  {
    path: "/update/:id",
    element: <UpdateProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
