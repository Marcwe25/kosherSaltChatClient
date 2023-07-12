import ChatClient from '../chatRoom/ChatClient'
import RoomList from '../roomsList/RoomList'
import { useState , useEffect} from 'react'
import useWebSocket from '../hooks/useWebSocket'
import useRoomList from '../hooks/useRoomList';
import Profile from './ProfilePage'
import NewRoom from '../pages/NewRoom'
import { all_rooms_url } from "../utility/constsURL";
import useAuth from "../hooks/auth-context";
import useAuthentication from '../hooks/useAuthentication'
import AppMenu from '../menus/AppMenu';
import useData from '../hooks/data-context';
import { ADD_TO_CHAT_PAGE, APP_MENU, NEW_ROOM, NOTIFICATION_LIST, PROFILE } from '../utility/constNames';
import AddUsers from './AddUsers';
import useNotificationList from '../hooks/useNotificationList';
import NotificatiolnList from '../roomsList/NotificationList';
import "../css//ChatClient.css"

const ChatUI = () => {
    const { roomId,chooseRoom} = useData()

    const {registeredMember} = useAuth()
    const {setUserDetail} = useAuthentication()
    const [chatMessages,setChatMessages] = useState([])

    useEffect(()=>{
        if(registeredMember==null) setUserDetail()
    },[registeredMember,setUserDetail])

    const addToChatMessage = (message) => {
        if(message) {
            setChatMessages(prevChatMessages=>[...prevChatMessages,message])}}

    const {notificationList,fetchNotificationList,addNotification} = useNotificationList()
    const {roomList,fetchRoomList, setLastPost,roomListLoaded} = useRoomList(all_rooms_url);
    const {sendMessage} = useWebSocket(addNotification,setLastPost, roomList,roomListLoaded,addToChatMessage);

    const handleSendMessage = (destination,message) => {
        sendMessage(destination,message)
    }

    const refreshRoomList = () => {
        fetchRoomList()
    }

    return (
        <>
                {roomId === PROFILE  &&      <Profile/>}
                {roomId === NEW_ROOM &&      <NewRoom
                                                fetchRoomList={fetchRoomList}
                                            />}
                {roomId === APP_MENU &&      <AppMenu />}

                {typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST) &&
                    <NotificatiolnList
                        fetchNotificationList={fetchNotificationList}
                        fetchRoomList={fetchRoomList}
                        notificationList={notificationList}
                    />}


                {roomId === ADD_TO_CHAT_PAGE &&
                                            <AddUsers 
                                                roomList={roomList}
                                                refreshRoomList={refreshRoomList}
                                            />}


                {roomId ===   0  &&          <RoomList 
                                                roomList={roomList}
                                                notificationList={notificationList}
                                
                                            />}

                {!isNaN(roomId) && roomId>0 &&
                                            <ChatClient
                                                roomList={roomList}
                                                // room={getRoomObject()}
                                                chatMessages={chatMessages}
                                                setChatMessages={setChatMessages}
                                                sendMessage={handleSendMessage}
                                                refreshRoomList={refreshRoomList}
                                            />}
        </>


    )

}
export default  ChatUI;
