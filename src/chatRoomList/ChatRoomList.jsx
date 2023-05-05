import { useState } from "react";
import { chatRoom_url} from "../utility/constsURL";
import { Link} from "react-router-dom";
import ChatRoomIcon from "../chatRoomIcon/ChatRoomIcon";

const ChatRoomsList = (prop)=>{

    const roomsList = prop.chatRoomsList

    const refreshRoomList = () => {
        prop.updateList(1)
      }
    
    return (
        <nav>
        { roomsList?.length ? 
        (
            <ul>
               {roomsList.map((chatroom) => <ChatRoomIcon key={chatroom.id} chatroom={chatroom} updateList={refreshRoomList} />)
                }
            </ul>
        ): <p onClick={refreshRoomList}>no chat</p>
        } 
      </nav>
    );

}

export default ChatRoomsList