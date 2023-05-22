import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN } from '../utility/constNames';


const useWebSocket = (onConnectCallback,roomId,registeredMember) => {

  const [isConnected, setisConnected] = useState(false);
  const stompClientRef = useRef(null);

  

  const n = Math.round(Math.random()*1000000)
  console.log(`started reading useWebsocket id ${n} with room ${roomId} and member ${registeredMember?.username}`)

  const subscribe = (destination, callback) => {
    console.log('websocket is going to subscribe', (stompClientRef.current!==null), isConnected );
    if (stompClientRef.current && isConnected) {
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

      };

      return subscribtion;
      };
    
  };


    const sendMessage = (destination, message) => {
      console.log("websocket is sending message", message)
      if (stompClientRef.current && isConnected) {
        stompClientRef.current.publish({destination:destination, body: JSON.stringify(message)});
      }
    };
  
  const tokenValue = localStorage.getItem(ACCESS_TOKEN)
  const query = `?roomid=${roomId}&tokenbearer=${tokenValue}`

  useEffect(() => {
    if(!stompClientRef.current && registeredMember){
      console.log("usewebsocket is creating a new sockjs connection")
      const socket = new SockJS(ws_url + query);
      const stompClient = new Client({ webSocketFactory: () => socket });

      stompClient.onConnect = function (frame) {
        console.log(`websocket connected for room ${roomId}`)
        stompClientRef.current = stompClient;
        setisConnected(true)
        if (typeof onConnectCallback === 'function') {
          onConnectCallback();
        }
      };

      console.log("usewebsocket is checking if activation is needed")
      if(!isConnected && registeredMember){
        console.log("usewebsocket is activating")
        stompClient.activate()
      }

    }

  }, [registeredMember]);


  return { stompClientRef, isConnected,sendMessage,subscribe };
};

export default useWebSocket;
