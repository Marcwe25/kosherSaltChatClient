import { useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN } from '../utility/constNames';
import useNotificationList from './useNotificationList';


const useWebSocket = (addNotification,setLastPost,roomId, roomList,roomListLoaded,addToChatMessage) => {

  const onMessageCallback = useRef(null)
  const onSystemCallback = useRef(null)
  const messagingSubscription = useRef()
  const systemSubscription = useRef()
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
      if (stompClientRef.current && isConnected()) {
        stompClientRef.current.publish({destination:destination, body: JSON.stringify(message)});
      }
    };

    const getSessionId = (socket) => {
      console.log("stompClientRef",stompClientRef.current)
        let url = stompClientRef.current.webSocket._transport.ws.url
        const part1 = url.split("?")[0]
        let elements = part1.split("/")
        const i1 = elements.indexOf("websocket")
        const sessionId = elements[i1-1]
        return sessionId
    }

    const tokenValue = localStorage.getItem(ACCESS_TOKEN)
    const query = `?roomid=${roomId}&tokenbearer=${tokenValue}`

    const setupNewStompClient = () => {
      const socket = new SockJS(ws_url + query);
      let stompClient = new Client({ webSocketFactory: () => socket });
      stompClient.onChangeState((state)=>{console.warn("stomp clien change status to : ",state)})
      stompClient.onDisconnect(()=>console.warn("stomp client disconnected"))
      stompClient.reconnect_delay = 5000;
      stompClient.onConnect = function (sessionId) {
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

  function makeSystemSubscription () {
    const systemCallBack = (message => addNotification(message))
    subscribe(`/user/queue/to-user${getSessionId()}`,systemCallBack)

  }

  function makeAllSubscription () {
    if(roomList){
      if(!messagingSubscription?.current){
        messagingSubscription.current = {}
      }
      if(!onMessageCallback?.current){
        onMessageCallback.current = []
      }
      roomList.rooms.forEach( room => {
        if(room.memberRoomEnable)
          makeSubscription(room.id)
        }
      )
    }
    if(!systemSubscription.current){
      makeSystemSubscription ()
    }
  }

  function lastMessageCallBack(message){
    setLastPost(message.room.id,message)
  }

  function chatMessageCallBack(message){
    lastMessageCallBack(message)
    addToChatMessage(message)
  }

  function setLastMessageCallBack(roomId){
    if(onMessageCallback.current) {
    onMessageCallback.current[roomId] = lastMessageCallBack}
  }

  function setChatMessageCallBack(roomId){
    if(onMessageCallback?.current){
      onMessageCallback.current[roomId] = chatMessageCallBack}
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
