import { useState, useEffect, useCallback, useReducer } from 'react';
import { useApi } from './useApi';
import { all_rooms_url } from '../utility/constsURL';

function useRoomList() {

  const {axiosInstance} = useApi()
  const [roomListLoaded, setRoomListLoaded] = useState(false)

  function fetchRoomList() {
    setRoomListLoaded(false)
    axiosInstance.get(all_rooms_url)
      .then(response => {
          dispatch(
            {type:"FETCH_SUCCESS", payload: response.data})
      })
      .catch(error => {
          dispatch(
            {type:"FETCH_ERROR"})
      })
  }

  useEffect(() => {
    fetchRoomList()
  }, []);

  function reducer (state, action) {
    switch (action.type) {

      case 'FETCH_SUCCESS' :{
        setRoomListLoaded(true)
        return {
          ...action.payload
        }
      }

      case 'UPDATE_UNREAD' :{
        return {
          ...state,
          rooms: state.rooms.map((room)=>{
            if(room.id===action.roomid){
              room.unread = action.unread
            }
            return room
          })
        }
      }

      case 'INCREMENT_UNREAD' :{
        console.log("incrementingggg ROOM : ", action.roomid)
        return {
          ...state,
          rooms: state.rooms.map((room)=>{
            if(room.id===action.roomid){
              room.unread = room.unread+1
            }
            return room
          })
        }
      }

      case 'RESET_UNREAD' :{
        console.log("RESETING ROOM : ", action.roomid)
        return {
          ...state,
          rooms: state.rooms.map((room)=>{
            if(room.id===action.roomid){
              room.unread = 0
            }
            return room
          })
        }
      }

      case 'UPDATE_LASTMESSAGE' :{
        console.log("inside dispatcher: " ,action.roomid,action.lastMessage )
        return {
          ...state,
          rooms: state.rooms.map((room)=>{
            if(room.id===action.roomid){
              room.lastMessage = action.lastMessage
            }
            return room
          })
        }
      }

      case 'ADD_ROOM' :{
        return {
          ...state,
          rooms: [...state.rooms, action.room]
        }
      }
    }
  }

  const [roomList, dispatch] = useReducer(reducer,null,fetchRoomList)

  function setUnread (roomid, unread) {
    dispatch(
      {type:"UPDATE_UNREAD", unread: unread, roomid: roomid})
  }

  function incrementUnread (roomid) {
    dispatch(
      {type:"INCREMENT_UNREAD", roomid: roomid})
  }

  function resetUnread (roomid) {
    dispatch(
      {type:"RESET_UNREAD", roomid: roomid})
  }

  function setLastMessage (roomid, lastMessage) {
    console.log("dispatchingggggg last message")
    dispatch(
      {type:"UPDATE_LASTMESSAGE", lastMessage: lastMessage, roomid: roomid})
    console.log("after dispatch:",roomList)
  }

  function addRoom (room)  {
    dispatch({type:"ADD_ROOM", room: room})}


  return {roomList, setLastMessage, setUnread, addRoom, fetchRoomList, roomListLoaded,incrementUnread,resetUnread}
}

export default useRoomList;


// const updateRoom = 
//     (id, updates) => {
//     setRoomList(prevRoomList => {
//       const rooms = [...prevRoomList.rooms]
//       const newRooms = rooms.map(room =>  {
//         if (room.id === id) {
//           room.lastMessage=updates
//         }
//         return room;
//       })
//       return {...prevRoomList,rooms:newRooms}
      
//     }
//   )
// }

  // const deleteRoom = useCallback((id) => {
  //   // remove room from room list and update state
  //   setRoomList(prevRoomList => prevRoomList.filter(room => room.id !== id));
  // }, []);

// async function fetchRoomList() {
//   const response = await axiosInstance.get(all_rooms_url);
//   setRoomList(response.data);
// }
// useEffect(() => {
//   fetchRoomList()

//   ;
// }, []);

////////////////////////////////////////////////////////////////////////////
      // const updatedList = prevRoomList.rooms.map(room => {
      //   if (room.id === id) {
      //     return { ...room, ...updates };
      //   }
      //   return room;
      // }
      // );

    //   prevRoomList.rooms.forEach(room=>{
    //     if( room.id===id ){
    //       room.lastMessage = updates
    //       console.log("update lastmessage",room)
    //     }
    //   })
    //   console.log(prevRoomList)
    //   return prevRoomList;
    // }

  // const addRoom = useCallback((room) => {
  //   // add new room to room list and update state
  //   setRoomList(prevRoomList => [...prevRoomList, room]);
  // }, []);
