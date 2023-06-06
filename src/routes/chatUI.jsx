

import ChatClient from '../chatRoom/ChatClient'
import RoomList from '../roomsList/RoomList'
import { useRef, useState } from 'react'
import useRegisteredMember from '../hooks/useRegisteredMember'
import useWebSocket from '../chatRoom/useWebSocket'
import useRoomList from '../hooks/useRoomList';
import "../chatRoom//ChatClient.css"
import Profile from './Profile'
import RoomCreator from '../roomsList/RoomCreator'
import { useEffect } from 'react'
import { useApi } from "../hooks/useApi";
import { posts_for_room_url } from "../utility/constsURL";
import useRoomId from '../hooks/useRoomId'
import useAuth from "../hooks/auth-context";

const ChatUI = () => {
    const {axiosInstance} = useApi()

    const addToChatMessage = (message) => {
        console.log("adding message in chatui: ",message)
        if(message) { setChatMessages( (prevChatMessages) => [message,...prevChatMessages] )}};
    
    

    const [roomId,setRoomId] = useState(0);
    const {roomList, setLastPost,roomListLoaded,resetUnread} = useRoomList();
    const {registeredMember } = useRegisteredMember(setRoomId)
    const [chatMessages,setChatMessages] = useState([])
    const {sendMessage,stompClientRef,messagingSubscription,setChatMessageCallBack,setLastMessageCallBack} = useWebSocket(setLastPost,roomId, roomList,roomListLoaded,addToChatMessage);

    const handleSendMessage = (destination,message) => {
        console.log("handleSendMessage in chatUI ",message,destination)
        sendMessage(destination,message)
    }



    const getRoomObject = () => {
        const room = roomList?.rooms.find(room => room.id === roomId )
        return room
    }
 
    const chooseRoom = async (rid) => {
        setLastMessageCallBack(roomId)
        setChatMessageCallBack(rid)
        await getPastPosts(rid)
        setRoomId(rid)
        resetUnread(rid)

    }

    function handleRoomClick(event) {
        chooseRoom(event);
    }

    const [uiComponent,setUiComponent] = useState(null)

    function getComponent (){
        switch (roomId) {
            case "profile":
                return <Profile chooseRoom={chooseRoom}/>

            case "newRoom":
                return <RoomCreator chooseRoom={chooseRoom}/>

            case isNaN,null, 0:
                return <RoomList handleRoomClick={handleRoomClick} roomList={roomList}/>
        
            default:
                return <ChatClient
                            room={getRoomObject()}
                            members={roomList?.members}
                            chatMessages={chatMessages}
                            setChatMessages={setChatMessages}
                            handleRoomClick={handleRoomClick}
                            sendMessage={handleSendMessage}
                            registeredMember={registeredMember }
                        />}
        
    }

    useEffect (()=>{
        setUiComponent(getComponent())
    },[roomId,roomList])

    const getPastPosts = async (rid) => {
        console.log("getPastPosts", rid)
        if(rid && Number.isInteger(rid) && rid>0){
            let response = null
            response = await axiosInstance.get(posts_for_room_url+`/${rid}`);
            const pastPosts = response?.data
            pastPosts.map( 
                post => { 
                    const mid = post.from
                    post.from = roomList.members[mid]
                }
            )

            setChatMessages((prevChatMessages) => [ ...pastPosts]);        }
    }

    return uiComponent

}
export default  ChatUI;
