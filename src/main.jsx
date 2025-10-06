// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import MainDashboard from './pages/MainDashboard.jsx';
import WishMaster from './pages/WishMaster.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDashboard />,
  },
  {
    path: "/WM-Dashboard",
    element: <WishMaster />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

