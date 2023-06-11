

import ChatClient from '../chatRoom/ChatClient'
import RoomList from '../roomsList/RoomList'
import { useState } from 'react'
import useWebSocket from '../hooks/useWebSocket'
import useRoomList from '../hooks/useRoomList';
import "../chatRoom//ChatClient.css"
import Profile from './Profile'
import NewRoom from '../roomsList/NewRoom'
import { useEffect } from 'react'
import { useApi } from "../hooks/useApi";
import { posts_for_room_url } from "../utility/constsURL";
import useAuth from "../hooks/auth-context";
import useAuthentication from '../hooks/useAuthentication'
import AppMenu from '../menus/AppMenu';
import useData from '../hooks/data-context';
import { APP_MENU, NEW_ROOM, PROFILE } from '../utility/constNames';

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

    const {previousRoomId,roomId} = useData()
    const {roomList,fetchRoomList, setLastPost,roomListLoaded,resetUnread} = useRoomList(registeredMember);
    const [chatMessages,setChatMessages] = useState([])
    const {sendMessage, stompClientRef, messagingSubscription,setChatMessageCallBack,setLastMessageCallBack} = useWebSocket(setLastPost,roomId, roomList,roomListLoaded,addToChatMessage);

    const applyRoomChange = async () => {
        setLastMessageCallBack(previousRoomId)
        setChatMessageCallBack(roomId)
        await getPastPosts(roomId)
        resetUnread(roomId)
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

    const [uiComponent,setUiComponent] = useState(null)

    function getComponent (){
        switch (roomId) {
            case PROFILE:
                return <Profile/>

            case NEW_ROOM:
                return <NewRoom/>

            case APP_MENU:
                return <AppMenu />

            case isNaN,null, 0:
                return <RoomList roomList={roomList}/>
        
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
