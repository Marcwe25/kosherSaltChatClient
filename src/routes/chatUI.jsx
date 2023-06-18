

import ChatClient from '../chatRoom/ChatClient'
import RoomList from '../roomsList/RoomList'
import { useState } from 'react'
import useWebSocket from '../hooks/useWebSocket'
import useRoomList from '../hooks/useRoomList';
import "../chatRoom//ChatClient.css"
import Profile from './ProfilePage'
import NewRoom from '../roomsList/NewRoom'
import { useEffect } from 'react'
import { useApi } from "../hooks/useApi";
import { all_rooms_url, posts_for_room_url } from "../utility/constsURL";
import useAuth from "../hooks/auth-context";
import useAuthentication from '../hooks/useAuthentication'
import AppMenu from '../menus/AppMenu';
import useData from '../hooks/data-context';
import { ADD_TO_CHAT_PAGE, APP_MENU, NEW_ROOM, NOTIFICATION_LIST, PROFILE } from '../utility/constNames';
import AddUsers from '../pages/AddUsers';
import useNotificationList from '../hooks/useNotificationList';
import NotificatiolnList from '../roomsList/NotificationList';

const ChatUI = () => {

    const {registeredMember} = useAuth()
    const {setUserDetail} = useAuthentication()

    useEffect(()=>{
        if(!registeredMember) setUserDetail()
    },[])


    const {axiosInstance} = useApi()

    const addToChatMessage = (message) => {
        if(message) {
            setChatMessages(prevChatMessages=>[message,...prevChatMessages])}};
    const {notificationList,fetchNotificationList,addNotification} = useNotificationList()
    const {previousRoomId,roomId,currentRoom} = useData()
    const {roomList,fetchRoomList, setLastPost,roomListLoaded,resetUnread} = useRoomList(all_rooms_url);
    const [chatMessages,setChatMessages] = useState([])
    const {sendMessage, stompClientRef, messagingSubscription,setChatMessageCallBack,setLastMessageCallBack} = useWebSocket(addNotification,setLastPost,roomId, roomList,roomListLoaded,addToChatMessage);

  
    !!notificationList && console.log("chatui notificationList", notificationList)

    const applyRoomChange = async () => {
        if(!isNaN(roomId) && roomId > 0){
            setLastMessageCallBack(previousRoomId())
            setChatMessageCallBack(roomId)
            await getPastPosts(roomId)
            resetUnread(roomId)
        }

    }

    useEffect(()=>{
        applyRoomChange()
    },[roomId])

    const handleSendMessage = (destination,message) => {
        sendMessage(destination,message)
    }

    const refreshRoomList = () => {
        fetchRoomList()
    }

    const getRoomObject = () => {
        if(!isNaN(roomId) && roomId> 0) {
            const room = roomList?.rooms.find(room => room.id === roomId )
            room.membersDetails = room.members.reduce((a, memberid) => (
                 { ...a, [memberid]: roomList.members[memberid]}), {}) 
            return room
        }
    }

    const membersNotInRoom = () => {
        const room = roomList?.rooms.find(room=>room.id===currentRoom)
        const membersId = (Object.keys(roomList.members).filter(k=>(k in room.membersDetails === false)))
        const members = membersId.reduce((a, memberid) => (
            { ...a, [memberid]: roomList.members[memberid]}), {}) 
        return members
    }

    const [uiComponent,setUiComponent] = useState(null)
    console.log("roonId",roomId)
    console.log("roonId",typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST))
    
    const isNotificationShortcut = (roomId) => {
        return typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST)
    }

    

    function getComponent (){
        console.log("chatui getComponent for id ", roomId)
        console.log("chatui getComponent for id ", isNotificationShortcut(roomId))

        if (isNotificationShortcut(roomId)){
            console.log("yyyyyyyyyyyyyy")
             return <NotificatiolnList
                        fetchNotificationList={fetchNotificationList}
                        notificationList={notificationList}

                        />
            }
    

        switch (roomId) {
            case PROFILE:
                return <Profile/>

            case NEW_ROOM:
                return <NewRoom/>

            case APP_MENU:
                return <AppMenu />

            case ADD_TO_CHAT_PAGE:
                return <AddUsers 
                    members={roomList.members}
                    membersNotInRoom={membersNotInRoom()}
                    refreshRoomList={refreshRoomList}
                />


            case  0:
                return <RoomList 
                            roomList={roomList}
                            fetchRoomList={fetchRoomList}
                            notificationList={notificationList}
                
                />
        
            default:
                return <ChatClient
                            room={getRoomObject()}
                            chatMessages={chatMessages}
                            sendMessage={handleSendMessage}
                            registeredMember={registeredMember }
                            refreshRoomList={refreshRoomList}
                        />}
        
    }

    useEffect (()=>{
        console.log("useeffect in chatui react to roomid change",roomId)
        setUiComponent(getComponent())
    },[roomId,roomList,notificationList])

    const getPastPosts = async (rid) => {
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

            setChatMessages((prevChatMessages) => [ ...pastPosts]);}
    }

    return uiComponent

}
export default  ChatUI;
