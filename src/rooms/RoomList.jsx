import { useState } from "react";
import { room_url} from "../utility/constsURL";
import { Link} from "react-router-dom";
import RoomIcon from "./RoomIcon";

const RoomsList = (prop)=>{

    const roomsList = prop.roomsList

    // const refreshRoomList = () => {
    //     prop.updateList(1)
    //   }
    
    return (
        <nav>
        { roomsList?.length ? 
        (
            <ul>
               {roomsList.map((room) => <RoomIcon key={room.id} room={room}
                // updateList={refreshRoomList}
                 />)
                }
            </ul>
        ): <p 
        // onClick={refreshRoomList}
        
        >no chat</p>
        } 
      </nav>
    );

}

export default RoomsList