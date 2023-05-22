

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
    const subscribtionRef = useRef(null)
    const [roomList, setRoomList, updateRoom, addRoom, deleteRoom] = useRoomList();
    const {registeredMember } = useRegisteredMember(setRoomId)
    const [messages, setMessages] = useState([]);

    console.log("registeredMember",registeredMember)
    console.log("roomId",roomId)

    const getPastPosts = async () => {
        if(roomId){
            const response = await axiosInstance.get(posts_for_room_url+`/${roomId}`);
            const pastPosts = response?.data
            pastPosts.map( 
                post => { 
                    const mid = post.from
                    post.from = roomList.members[mid]
                }
            )
            setMessages((prevMessages) => [ ...pastPosts]);
        }
    }


    const n = Math.round(Math.random()*1000000)
    console.log(`started reading ChatUI id ${n} with room ${roomId} member ${registeredMember?.username}`)


    const onConnect = () => {
        console.log("new connection done")
        subscribtionRef.current = subscribe(`/topic/${roomId}`, (message) => {
        handleMessageReceived(message.body)
    })};

    const {stompClientRef,
        isConnected, 
        sendMessage, 
        subscribe} = useWebSocket(onConnect,roomId,registeredMember);


    const handleMessageReceived = (message) => {
        setMessages((prevMessages) => [message,...prevMessages]);
    };

    useEffect(()=>{
        getPastPosts().then(
            ()=>{
                if( stompClientRef?.current){
                    console.log("going to subscribe")
                    subscribtionRef.current = subscribe(`/topic/${roomId}`, (message) => {handleMessageReceived(message)
                    })
                }
            }
        )
        console.log(`useEffect in chatUI, check if subscribe to room ${roomId} is needed`)
        
        return () => {
            
            console.log("useeffect in chatui returning, checking if there is a scubscribtion",subscribtionRef?.current!=null,n)
            if(subscribtionRef?.current){
                console.log("useeffect in chatui making unsubscribe")
                subscribtionRef.current.unsubscribe()}
                subscribtionRef.current=null
                    
        }
    },
    [isConnected,roomId])

    const handleSendMessage = (destination,message) => {
        sendMessage(destination,message)
    }

    const getRoomContacts = (room) => {
        const members = room.members
        const roomContacts = {}
        members.map( id=> {
          roomContacts[id] = roomList.members[id]})
        return roomContacts
      }

    const getRoomObject = () => {
        const room = roomList?.rooms.find(room => room.id === roomId )
        return room
    }
    
    if( !roomId && roomId===0){
        return <RoomList
                        setSelected={setRoomId}
                        roomList={roomList}
                        contactsBook={contactsBook} />
        } 
        console.log("rendering ChatClient maybe ", roomId)
        console.log("rendering ChatClient maybe ",  !roomId )
        console.log("rendering ChatClient maybe ",  roomId>0 )



    if( roomId && roomId>0 ) {
        console.log("rendering ChatClient")
        return <ChatClient 
                        room={getRoomObject()}
                        setSelected={setRoomId}
                        stompConnected={isConnected}
                        sendMessage={handleSendMessage}
                        StompMessages={messages}
                        registeredMember={registeredMember }
                        />}
    // return <Waiting />

}

export default  ChatUI;