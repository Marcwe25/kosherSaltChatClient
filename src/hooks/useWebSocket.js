import { useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN } from '../utility/constNames';


const useWebSocket = (setLastPost,roomId, roomList,roomListLoaded,addToChatMessage) => {

  const onMessageCallback = useRef(null)
  const messagingSubscription = useRef()

  const stompClientRef = useRef(null)

  const isConnected = () => {
      return stompClientRef.current?.connected
    }

    const subscribe = (destination, callback) => {
      if (stompClientRef.current && isConnected()) {
        let subscribtion = null
        try{
            subscribtion = stompClientRef.current.subscribe(
              destination,
              (message) => {
                  callback(JSON.parse(message.body))},
              {'ack': `ack received for room ${roomId}`}
                ) 
            }
        catch (err){
          console.error("error subscribing to room: ", destination)
          console.error("here the error:", err)
        };
        return subscribtion;
        };
    };

    const sendMessage = (destination, message) => {
      console.log("send message in usewebsocket " , message)
      if (stompClientRef.current && isConnected()) {
        console.log("ready to send message in usewebsocket " , message)
        stompClientRef.current.publish({destination:destination, body: JSON.stringify(message)});
      }
    };

    const tokenValue = localStorage.getItem(ACCESS_TOKEN)
    const query = `?roomid=${roomId}&tokenbearer=${tokenValue}`

    const setupNewStompClient = () => {
      const socket = new SockJS(ws_url + query);
      let stompClient = new Client({ webSocketFactory: () => socket });
      stompClient.onChangeState((state)=>{console.warn("stomp clien change status to : ",state)})
      stompClient.onDisconnect(()=>console.warn("stomp client disconnected"))
      stompClient.reconnect_delay = 5000;
      stompClient.onConnect = function () {
        if (typeof makeAllSubscription === 'function') {
          makeAllSubscription();
        }
      };
      return stompClient
    }



  useEffect(() => {
    let stompClient = null;

    // if roomlist have been loaded
    if (roomListLoaded) {
        console.log("roomList",roomList)
        // checking for stomp client ref
        if(!stompClientRef.current){
          stompClientRef.current = setupNewStompClient();
        }

        // checking if there is a client but need activation
        if(stompClientRef.current && !stompClientRef.current.active){
          stompClientRef.current.activate()
        }

        // checking if activated client doesn't have subscription
        const values = Object.values(stompClientRef.current)
        if (stompClientRef.current.connected && values.length==0){
          makeAllSubscription () 
        }
    }

    return async () => {
      if(stompClientRef?.current){
        await stompClientRef.current.deactivate();
        stompClientRef.current = null
      }
    }

  },[roomListLoaded])

  function makeAllSubscription () {
    if(roomList){
      console.log("making subscription to rooms for roomlist", roomList)
      if(!messagingSubscription?.current){
        messagingSubscription.current = {}
      }
      if(!onMessageCallback?.current){
        onMessageCallback.current = []
      }
      roomList.rooms.forEach( room => {
          makeSubscription(room.id)
          console.log("subscribing to room ", room.id)
        }
      )
    }
  }

  function lastMessageCallBack(message){
    setLastPost(message.room.id,message)
  }

  function chatMessageCallBack(message){
    lastMessageCallBack(message)
    console.log("adding message to chat ", message)
    addToChatMessage(message)
  }

  function setLastMessageCallBack(roomId){
    onMessageCallback.current[roomId] = lastMessageCallBack
  }

  function setChatMessageCallBack(roomId){
    console.log("setting callback for chat in room ", roomId)
    onMessageCallback.current[roomId] = chatMessageCallBack
  }

  function makeSubscription (roomId) {
    setLastMessageCallBack(roomId)
    messagingSubscription.current[roomId] = subscribe(`/topic/${roomId}`,
    (message) => {
        onMessageCallback.current[roomId](message)
    } )
  }

  return { stompClientRef,isConnected,sendMessage,subscribe,messagingSubscription, setChatMessageCallBack,setLastMessageCallBack};
};

export default useWebSocket;
