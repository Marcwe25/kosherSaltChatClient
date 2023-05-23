

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
    // const subscribtionRef = useRef(null)
    const [roomList, setRoomList, updateRoom, addRoom, deleteRoom] = useRoomList();
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
    }

    const updateLastMessage = (message) => {
        const roomId = message.room.id
        console.log("updating last message, message :", message)
        console.log("updating last message, roomid :", roomId)
        updateRoom(roomId,message)
    }

    const handleMessageReceived = (message) => {
        console.log("message.body: ",message)
        console.log("message: ",message)
        if(message) { setMessages( (prevMessages) => [message,...prevMessages] ) } };

    const dispatchNewMessage = (message) => {
        const roomId = message.room.id
        incomingDispatcher.current[roomId](message)
    }

    const onConnect = () => {
        if(!roomList){console.warn("no rooms list")}
        messagingSubscription.current = {}
        roomList.rooms.forEach( room => {
            incomingDispatcher.current[room.id] = updateLastMessage
            console.log("subscribing to room: ",room)
            messagingSubscription.current[room.id] = subscribe(`/topic/${room.id}`, dispatchNewMessage)}
        )
    }



    const {
        stompClientRef,
        sendMessage, 
        subscribe} = useWebSocket(onConnect,roomId,roomList);

    const handleSendMessage = (destination,message) => {
        sendMessage(destination,message)
    }

    const getRoomObject = () => {
        const room = roomList?.rooms.find(room => room.id === roomId )
        return room
    }
    
    if( !roomId && roomId===0){
        return <RoomList
                        chooseRoom={chooseRoom}
                        roomList={roomList}
                        contactsBook={contactsBook} />
        } 
        console.log("rendering ChatClient maybe ", roomId)
        console.log("rendering ChatClient maybe ",  !roomId )
        console.log("rendering ChatClient maybe ",  roomId>0 )



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

    // const getRoomContacts = (room) => {
    //     const members = room.members
    //     const roomContacts = {}
    //     members.map( id=> {
    //       roomContacts[id] = roomList.members[id]})
    //     return roomContacts
    //   }

  // useEffect(()=>{
    //     getPastPosts().then(
    //         ()=>{
    //             if( stompClientRef?.current){
    //                 console.log("going to subscribe")
    //                 subscribtionRef.current = subscribe(`/topic/${roomId}`,handleMessageReceived)
    //             }
    //         }
    //     )
    //     console.log(`useEffect in chatUI, check if subscribe to room ${roomId} is needed`)
        
    //     return () => {
            
    //         console.log("useeffect in chatui returning, checking if there is a scubscribtion",subscribtionRef?.current!=null,n)
            // if(subscribtionRef?.current){
                // console.log("useeffect in chatui making unsubscribe")
                // subscribtionRef.current.unsubscribe()}
                // subscribtionRef.current=null
        // }
    // },
    // [isConnected,roomId])