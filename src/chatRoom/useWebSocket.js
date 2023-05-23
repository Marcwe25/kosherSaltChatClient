import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN } from '../utility/constNames';
import useRoomList from '../hooks/useRoomList';

const useWebSocket = (onConnectCallback,roomId,roomList) => {

  const stompClientRef = useRef(null);

  const isConnected = () => {
    return stompClientRef.current?.connected
}
  const n = Math.round(Math.random()*1000000)
  console.log(`started reading useWebsocket id ${n} with room ${roomId}}`)

  const subscribe = (destination, callback) => {
    console.log('websocket is going to subscribe', (stompClientRef.current!==null), isConnected() );
    if (stompClientRef.current && isConnected()) {
      console.log("websocket is returning subscription")
      let subscribtion = null
      try{
          subscribtion = 
          stompClientRef
          .current
          .subscribe(
            destination,
            (message) => {callback(JSON.parse(message.body))},
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
      console.log("publishimg message",message)
      if (stompClientRef.current && isConnected()) {
        stompClientRef.current.publish({destination:destination, body: JSON.stringify(message)});
      }
    };
  
  const tokenValue = localStorage.getItem(ACCESS_TOKEN)
  const query = `?roomid=${roomId}&tokenbearer=${tokenValue}`

  useEffect(() => {
    let stompClient = null
    console.log("useEffect in useWebsocket, stompClientRef:",stompClientRef)
    console.log("useEffect in useWebsocket, roomList",roomList)

    if(!stompClientRef.current && roomList){
      console.log("usewebsocket is creating a new sockjs connection")
      const socket = new SockJS(ws_url + query);
      stompClient = new Client({ webSocketFactory: () => socket });

      stompClient.onChangeState((state)=>{console.log("stomp clien change status to : ",state)})

      stompClient.onDisconnect(()=>console.log("stomp client disconnected"))

      stompClient.onConnect = function (frame) {
        console.log(`websocket connecting... `)
        stompClientRef.current = stompClient;

        if (typeof onConnectCallback === 'function') {
          console.log("running onconnect callback")
          onConnectCallback();
        }
      };
      stompClient.reconnect_delay = 5000;
      console.log("usewebsocket is checking if activation is needed")
      if(!isConnected() && roomList){
        console.log("usewebsocket is activating")
        stompClient.activate()
      }
    }
    return () => {
      if(stompClient){
        stompClient.deactivate();}
    };  }, [roomList]);


  return { stompClientRef,isConnected,sendMessage,subscribe };
};

export default useWebSocket;
