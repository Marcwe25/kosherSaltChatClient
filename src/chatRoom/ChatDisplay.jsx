import { useEffect, useState } from "react";
import MessageIcon from "./MessageIcon";

const ChatDisplay = (prop) => {

    const [pastMessages,setpastMessages] = useState(null)
    const roomId = prop.roomId


console.log("past messages", pastMessages)
    return (
          <div className="messagesDisplay">
            {prop.messages
            .sort((a,b)=>{return a.dateTime - b.dateTime})
            .map((post) => (
              <MessageIcon key={post.id} post={post} />
            ))}
          </div>
      );
}

export default ChatDisplay