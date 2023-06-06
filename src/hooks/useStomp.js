import { useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN } from '../utility/constNames';

export default function useStomp (roomId, onConnectCallback) {

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

      const tokenValue = localStorage.getItem(ACCESS_TOKEN)
      const query = `?roomid=${roomId}&tokenbearer=${tokenValue}`

      const setupNewStompClient = () => {
        const socket = new SockJS(ws_url + query);
        let stompClient = new Client({ webSocketFactory: () => socket });
        stompClient.onChangeState((state)=>{console.warn("stomp clien change status to : ",state)})
        stompClient.onDisconnect(()=>console.warn("stomp client disconnected"))
        stompClient.reconnect_delay = 5000;
        stompClient.onConnect = function () {
          stompClientRef.current = stompClient;
          if (typeof onConnectCallback === 'function') {
            onConnectCallback();
          }
        };
        return stompClient
      }

      return {stompClientRef, setupNewStompClient, isConnected, sendMessage,subscribe}
}