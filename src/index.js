import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";

import Root,{ roomLoader as rootLoader,action as rootAction, }  from "./routes/root";
import Login from './Login/Login';
import { AuthProvider } from './privateRoute/auth-context';
import RequireAuth from "./privateRoute/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <RequireAuth redirectTo="/login"> <Root /></RequireAuth>,
    errorElement: <Login />,
    // loader: rootLoader,
    action: rootAction,
    children: [

    ],

  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
