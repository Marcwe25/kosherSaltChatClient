import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../utility/constsURL';
import { ACCESS_TOKEN, AUTHORIZATION } from '../utility/constNames';
import useData from './data-context';


const useWebSocket = (addNotification, setLastPost, roomList, roomListLoaded, addToChatMessage) => {
    // {#558}
  const { previousRoomId, roomId } = useData()
  const tokenValue = localStorage.getItem(ACCESS_TOKEN)
  const query = `?roomid=${roomId}&accesstoken=${tokenValue}`
  const onMessageCallback = useRef(null)
  const messagingSubscription = useRef()
  const systemSubscription = useRef()
  const stompClientRef = useRef(null)

  // {#584}
  useEffect(() => {
    setLastMessageCallBack(previousRoomId())
    setChatMessageCallBack(roomId)
  }, [roomId, previousRoomId])

  // {#581}
  const isConnected = () => {
    return stompClientRef.current?.connected
  }

  // {#588}
  const subscribe = (destination, callback) => {
    if (stompClientRef.current && isConnected()) {
      let subscribtion = null
      try {
        subscribtion = stompClientRef.current.subscribe(
          destination,
          (message) => {
            callback(JSON.parse(message.body))
          },
          { 'ack': `ack received for room ${roomId}` }
        )
      }
      catch (err) {
      };
      return subscribtion;
    };
  };

  //  {#47d}
  const sendMessage = (destination, message) => {
    if (stompClientRef.current && isConnected()) {
      stompClientRef.current.publish({ destination: destination, body: JSON.stringify(message) });
    }
  };

  //  {#f9e}
  const getSessionId = () => {
    const arr = stompClientRef
      .current
      .webSocket
      ._transport.ws.url
      .split("?")[0]
      .split("/")
    const i1 = arr.indexOf("websocket")
    const sessionId = arr[i1 - 1]
    return sessionId
  }


  //  {#7d5}
  const setupNewStompClient = () => {
    const socket = new SockJS(ws_url + query);
    let stompClient = new Client({ webSocketFactory: () => socket })
    stompClient.connectHeaders = {
      [`${AUTHORIZATION}`]: `Bearer ${tokenValue}`
    }
    stompClient.onChangeState((state) => {
      console.warn("stomp clien change status to : ", state)
    })
    stompClient.onDisconnect(() => {
      console.warn("stomp client disconnected")
    })
    stompClient.reconnect_delay = 5000;
    stompClient.onConnect = function () {
      if (typeof makeAllSubscription === 'function') {
        makeAllSubscription();
      }
    };
    return stompClient
  }


  useEffect(() => {
    // if roomlist have been loaded
    if (roomListLoaded) {
      // checking for stomp client ref
      if (!stompClientRef.current) {
        stompClientRef.current = setupNewStompClient();
      }

      // checking if there is a client but need activation
      if (stompClientRef.current && !stompClientRef.current.active) {
        stompClientRef.current.activate()
      }

      // checking if activated client doesn't have subscription
      const values = Object.values(stompClientRef.current)
      if (stompClientRef.current.connected && values.length === 0) {
        makeAllSubscription()
      }
    }

    return async () => {
      if (stompClientRef?.current) {
        await stompClientRef.current.deactivate();
        stompClientRef.current = null
      }
    }

  }, [roomListLoaded])

  function makeSystemSubscription() {
    const systemCallBack = (message => addNotification(message))
    subscribe(`/user/queue/to-user${getSessionId()}`, systemCallBack)

  }

  function makeAllSubscription() {
    if (roomList) {
      if (!messagingSubscription?.current) {
        messagingSubscription.current = {}
      }
      if (!onMessageCallback?.current) {
        onMessageCallback.current = []
      }
      roomList.rooms.forEach(room => {
        if (room.memberRoomEnable)
          makeSubscription(room.id)
      }
      )
    }
    if (!systemSubscription.current) {
      makeSystemSubscription()
    }
  }

  function lastMessageCallBack(message) {
    setLastPost(message.room.id, message)
  }

  function chatMessageCallBack(message) {
    lastMessageCallBack(message)
    addToChatMessage(message)
  }

  function setLastMessageCallBack(roomId) {
    if (onMessageCallback.current) {
      onMessageCallback.current[roomId] = lastMessageCallBack
    }
  }

  function setChatMessageCallBack(roomId) {
    if (onMessageCallback?.current) {
      onMessageCallback.current[roomId] = chatMessageCallBack
    }
  }

  function makeSubscription(roomId) {
    setLastMessageCallBack(roomId)
    messagingSubscription.current[roomId] = subscribe(`/topic/${roomId}`,
      (message) => {
        onMessageCallback.current[roomId](message)
      })
  }

  return { stompClientRef, isConnected, sendMessage, subscribe, messagingSubscription, setChatMessageCallBack, setLastMessageCallBack };
};

export default useWebSocket;
