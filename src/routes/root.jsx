import { Outlet, useLoaderData,redirect} from "react-router-dom";
import { all_chatrooms_url} from "../utility/constsURL";
import axiosInstance from "../axios/axiosBuilder";
import ChatRoomsList from "../chatRoomList/ChatRoomList";
import ContactFinder from "../contactFinder/ContactFinder";
import { useState } from "react";
import {UseUpdateList} from "../customHooks/useupdateList";

export async function chatRoomLoader() {
  console.log("using loader")
  const memberChatRooms = await axiosInstance.post(all_chatrooms_url)
  return memberChatRooms
}

export async function action() {
    return redirect(``);
}
  
export default function Root() {
  const [roomsNumber,setRoomsNumber] = useState({roomsNumber:0});

  const updateRooms = (n) => {
    setRoomsNumber((prev)=>prev+n)
  }
  const {dinList: roomList} = UseUpdateList(roomsNumber)

    return (
      <div>
          <div id="sidebar">
            <h1>Contacts</h1>
              <ContactFinder updateList={updateRooms} />
              <ChatRoomsList chatRoomsList={roomList} updateList={updateRooms} />


          </div>
          <div id="detail">
              <Outlet/>
          </div>
          </div>
    );
  }


  // const [chatRooms,setChatRoom] = useState(useLoaderData());

  // const refreshRoomList = () => {
  //   console.log("refreshing list")
  //   const newList = chatRoomLoader();
  //   setChatRoom(newList)
  // }