import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import AddProduct from "./components/AddProduct.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </ThemeContextProvider>
  </StrictMode>
);
