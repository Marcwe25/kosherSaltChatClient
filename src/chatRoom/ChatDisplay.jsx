import { useApi } from "../hooks/useApi";
import MessageIcon from "./MessageIcon";
import { posts_for_room_url } from "../utility/constsURL";
import useData from "../hooks/data-context";
import { useEffect } from "react";
const ChatDisplay = (props) => {

  const {axiosInstance} = useApi()
  const setChatMessages=props.setChatMessages
  const chatMessages = props.chatMessages
  const roomList = props.roomList
  const {roomId} = useData()
  

  useEffect( () => {
    axiosInstance.get(posts_for_room_url+`/${roomId}`)
    .then((response) => {
      const pastPosts = response?.data
      pastPosts.forEach(post => post.from = roomList.members[post.from])
      pastPosts.forEach(post => post.dateTime = new Date(post.dateTime))
      setChatMessages(prevChatMessages => [ ...pastPosts])}
    )
    return ()=>{
      setChatMessages(prevChatMessages => [])
    }
  },[])


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