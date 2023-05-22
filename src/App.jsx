import React from 'react';
import './css/index.css';
import RoomList from './roomsList/RoomList'
import {
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";
import ChatClient from './chatRoom/ChatClient';
import Root,{  action as rootAction, }  from "./routes/root";
import Login from './Login/Login';
import ChatUI from './routes/chatUI';
export default function App () {


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login  />,
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
