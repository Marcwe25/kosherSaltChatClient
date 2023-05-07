import { Outlet, useLoaderData,redirect} from "react-router-dom";
// import { all_rooms_url} from "../utility/constsURL";
// import axiosInstance from "../axios/axiosBuilder";
import RoomsList from "../roomList/RoomList";
import ContactFinder from "../roomList/ContactFinder";
import { useState } from "react";
import {UseUpdateList} from "../roomList/useupdateList";

// export async function roomLoader() {
//   console.log("using loader")
//   const memberRooms = await axiosInstance.get(all_rooms_url)
//   return memberRooms
// }

export async function action() {
    return redirect(``);
}
  
export default function Root() {
  const [roomsNumber,setRoomsNumber] = useState({roomsNumber:0});

  const updateRooms = (n) => {
    setRoomsNumber((prev)=>prev+n)
  }
  const {dinList: dinamicRoomList} = UseUpdateList(roomsNumber)

    return (
      <div>
          <div id="sidebar">
            <h1>Contacts</h1>
              <ContactFinder updateList={updateRooms} />
              <RoomsList roomsList={dinamicRoomList} updateList={updateRooms} />


          </div>
          <div id="detail">
              <Outlet/>
          </div>
          </div>
    );
  }


  // const [rooms,setRoom] = useState(useLoaderData());

  // const refreshRoomList = () => {
  //   console.log("refreshing list")
  //   const newList = roomLoader();
  //   setroom(newList)
  // }