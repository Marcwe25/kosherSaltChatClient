import React from 'react';
// import './css/index.css';
import {
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";
import Root,{  action as rootAction, }  from "./routes/root";
import Login from './Login/Login';
import ChatUI from './routes/chatUI';
import Registration from './Login/Registration';

export default function App () {


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login  />,
  },

  {
    path: "/registration",
    element: <Registration  />,
  },

  {
    path: "",
    element:<Root />,
    errorElement: <Login />,
    action: rootAction,
    children: [
      {
        element: <ChatUI />,
        path:'',
        errorElement: <Login />,

      }
    ],

  }
]);

return <RouterProvider router={router} />

}
