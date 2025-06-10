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
    ],
  },
  {
    path: "/product/:id",
    element: <ProductData />,
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
