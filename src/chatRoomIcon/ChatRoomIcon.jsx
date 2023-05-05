import { useState } from "react";
import { chatRoom_url} from "../utility/constsURL";
import { Link} from "react-router-dom";
import DeleteIcon from "../deleteIcon/DeleteIcon"
import "./ChatRoomIcon.css"
const ChatRoomIcon = (prop) => {

    const chatroom = prop.chatroom;
    const refreshRoomList = () => {
        prop.updateList()
      }
    const members = () => {
        try{
            const names = chatroom.chatMembers.map(member=>member.username.split("@")[0]).toString()
            return chatroom.id + " - " + (names.length? names:"someone")
        } catch {
            console.log(chatroom.chatMembers)
            return "someone"
        }

    }

    return <li key={chatroom.id}>
                <div className="fff"><Link to={`${chatRoom_url}/${chatroom.id}`}>
                    {members()}
                </Link>
                <DeleteIcon chatRoomId = {chatroom.id}  updateList={refreshRoomList} /></div>
            </li>

}

export default ChatRoomIcon