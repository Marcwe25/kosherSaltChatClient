import { useState, useEffect, useReducer } from 'react';
import { useApi } from './useApi';
import useAuth from './auth-context';
import { all_rooms_url } from "../utility/constsURL";
import useData from './data-context';

function useRoomList() {

  const {axiosInstance} = useApi()
  const [roomListLoaded, setRoomListLoaded] = useState(false)
  const {registeredMember} = useAuth()
  const {previousRoomId,roomId} = useData()
  const previouId = previousRoomId()
  
  useEffect(()=>{
    if(!isNaN(previouId) && previouId > 0) resetUnread(previouId)
  },[roomId])

  useEffect(() => {
    if (registeredMember && !roomListLoaded) fetchRoomList()
  }, [registeredMember,roomListLoaded]);

  function roomName (room, members,registeredMember) {
    return room.members.reduce((a, memberid) => (
      memberid === registeredMember.id ? a :
        (a + 
          (members[memberid].displayName !==null? members[memberid].displayName :members[memberid].username.split('@')[0]) + ", ")
        ),'').slice(0, -2)
  }

  function setRoomNameToAll (listObject,registeredMember) {
    return {...listObject,
    rooms: listObject.rooms.map(room => {
       room.name = roomName(room,listObject.members,registeredMember)
        return room})}
  } 

  const [roomList, dispatch] = useReducer(reducer,null)

  function fetchRoomList() {
    // setRoomListLoaded(false)
    axiosInstance.get(all_rooms_url)
      .then(response => {
        let roomlist = response.data
        setRoomNameToAll(roomlist,registeredMember)
          dispatch(
            {type:"FETCH_SUCCESS", payload: roomlist})
      })
      .catch(() => {
          dispatch(
            {type:"FETCH_ERROR"})
      })
  }

  function setUnread (roomid, unread) {
    dispatch(
      {type:"UPDATE_UNREAD", unread: unread, roomid: roomid})
  }

  function incrementUnread (roomid) {
    dispatch(
      {type:"INCREMENT_UNREAD", roomid: roomid})
  }

  function resetUnread (roomid) {
    if(roomList){
    dispatch(
      {type:"RESET_UNREAD", roomid: roomid})
    }
  }

  function setLastPost (roomid, lastPost) {
    dispatch(
      {type:"UPDATE_LASTPOST", lastPost: lastPost, roomid: roomid})
  }

  function addRoom (room)  {
    dispatch({type:"ADD_ROOM", room: room})}


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
  
        case 'UPDATE_LASTPOST' :{
          return {
            ...state,
            rooms: state.rooms.map((room)=>{
              if(room.id===action.roomid){
                room.lastPost = action.lastPost
                room.unread = room.unread+1
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

  return {roomList, setLastPost, setUnread, addRoom, fetchRoomList, roomListLoaded,incrementUnread,resetUnread}
}

export default useRoomList;
