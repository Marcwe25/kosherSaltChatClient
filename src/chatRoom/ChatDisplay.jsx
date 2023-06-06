import { useEffect, useState } from "react";
import MessageIcon from "./MessageIcon";
import { useApi } from "../hooks/useApi";
import { posts_for_room_url } from "../utility/constsURL";

const ChatDisplay = (props) => {

  const chatMessages = props.chatMessages
  const setChatMessages = props.setChatMessages
  const roomId = props.room.id
  const {axiosInstance} = useApi()

    return (
      <div className="messageContainer border1 back_image scrolable">
          <div >
            {chatMessages
                  .sort((a,b)=>{return a.dateTime - b.dateTime})
                  .map((post) => (
                    <MessageIcon key={post.id} post={post} />
                  ))
            }
          </div>
          </div>
      );
}

export default ChatDisplay