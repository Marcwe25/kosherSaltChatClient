

import ChatClient from '../chatRoom/ChatClient'
import RoomList from '../roomsList/RoomList'
import { useRef, useState } from 'react'
import useRegisteredMember from '../hooks/useRegisteredMember'
import useWebSocket from '../chatRoom/useWebSocket'
import { useEffect } from 'react'
import useRoomList from '../hooks/useRoomList';
import { useApi } from '../hooks/useApi'
import { posts_for_room_url } from '../utility/constsURL'


const ChatUI = () => {

    const {axiosInstance} = useApi()
    const [contactsBook,setContactsBook] = useState(null)
    const [roomId,setRoomId] = useState(null);
    const  {roomList, setLastMessage, setUnread, addRoom,roomListLoaded,incrementUnread,resetUnread} = useRoomList();
    const {registeredMember } = useRegisteredMember(setRoomId)
    const [messages, setMessages] = useState([]);
    const messagingSubscription = useRef(null)
    const incomingDispatcher = useRef({})
    console.log("registeredMember",registeredMember)
    console.log("roomId",roomId)



    const getPastPosts = async (rid) => {
        console.log("getPastPosts", rid)
        if(rid){
            let response = null
            response = await axiosInstance.get(posts_for_room_url+`/${rid}`);
            const pastPosts = response?.data
            pastPosts.map( 
                post => { 
                    const mid = post.from
                    post.from = roomList.members[mid]
                }
            )

            setMessages((prevMessages) => [ ...pastPosts]);        }
    }



    const chooseRoom = async (rid) => {
        
        incomingDispatcher.current[roomId] = updateLastMessage
        if(rid!==0){
            incomingDispatcher.current[rid] = handleMessageReceived
        }
        await getPastPosts(rid)
        setRoomId(rid)
        resetUnread(rid)
    }

    const updateLastMessage = (message) => {
        const roomId = message.room.id
        console.log("updating last message, roomid :", roomId)
        incrementUnread(roomId)
        setLastMessage(roomId,message)
    }

    const handleMessageReceived = (message) => {
        console.log("receiving message: ",message)
        if(message) { setMessages( (prevMessages) => [message,...prevMessages] ) } };

    const dispatchNewMessage = (message) => {
        const roomId = message.room.id
        incomingDispatcher.current[roomId](message)
    }

    const onConnect = () => {
        if(!roomList){console.warn("no rooms list")}
        console.log("on connect roomList:" , roomList)
        if(roomList){
            messagingSubscription.current = {}
            roomList.rooms.forEach( room => {
                incomingDispatcher.current[room.id] = updateLastMessage
                console.log("subscribing to room: ",room)
                messagingSubscription.current[room.id] = subscribe(`/topic/${room.id}`, dispatchNewMessage)}
            )
        }

    }



    const {
        stompClientRef,
        sendMessage,
        isConnected,
        subscribe} = useWebSocket(onConnect,roomId,roomListLoaded);

    const handleSendMessage = (destination,message) => {
        sendMessage(destination,message)
    }

    const getRoomObject = () => {
        const room = roomList?.rooms.find(room => room.id === roomId )
        return room
    }

    useEffect (()=>{
        console.log("checkup roomListLoaded",roomListLoaded)
        console.log("checkup roomList ",roomList)
        console.log("checkup isConnected ",isConnected())
        console.log("checkup messagingSubscription",messagingSubscription.current)
        console.log("checkup stompClientRef",stompClientRef.current)

        if(roomList && !isConnected()){

        }
    },[])
    
    console.log("messagingSubscription",messagingSubscription)
    console.log("incomingDispatcher",incomingDispatcher)

    if( !roomId && roomId===0){
        return <RoomList
                        chooseRoom={chooseRoom}
                        roomList={roomList}
                        contactsBook={contactsBook} />
        } 

    if( roomId && roomId>0 ) {
        console.log("rendering ChatClient aaa")
        return <ChatClient 
                        room={getRoomObject()}
                        chooseRoom={chooseRoom}
                        sendMessage={handleSendMessage}
                        messages={messages}
                        registeredMember={registeredMember }
                        />}
    // return <Waiting />

}

export default  ChatUI;
