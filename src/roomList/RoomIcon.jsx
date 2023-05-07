import { useState } from "react";
import { room_url} from "../utility/constsURL";
import { Link} from "react-router-dom";
import DeleteIcon from "./DeleteIcon"
import "../css/RoomIcon.css"
const RoomIcon = (prop) => {

    const room = prop.room;
    const refreshRoomList = () => {
        prop.updateList()
      }
    const members = () => {
        try{
            const names = room.members.map(member=>member.username.split("@")[0]).toString()
            return room.id + " - " + (names.length? names:"someone")
        } catch {
            console.log(room.members)
            return "someone"
        }

    }

    return <li key={room.id}>
                <div className="fff"><Link to={`${room_url}/${room.id}`}>
                    {members()}
                </Link>
                <DeleteIcon roomId = {room.id}  updateList={refreshRoomList} /></div>
            </li>

}

export default RoomIcon