import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import RoomList from './rooms/RoomList'
import {
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";

import Root,{  action as rootAction, }  from "./routes/root";
import Login from './Login/Login';


export default function App () {

const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
  
    {
      path: "/",
      element:<Root />,
      errorElement: <Login />,
      action: rootAction,
      children: [
        {
          element: <RoomList />
         
        }
      ],
  
    }
  ]);

  return <RouterProvider router={router} />

}
