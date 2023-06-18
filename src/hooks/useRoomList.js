import { useState, useEffect, useCallback, useReducer } from 'react';
import { useApi } from './useApi';
import useAuth from './auth-context';
import { all_rooms_url, posts_for_room_url } from "../utility/constsURL";

function useRoomList() {

  const {axiosInstance} = useApi()
  const [roomListLoaded, setRoomListLoaded] = useState(false)
  const {registeredMember} = useAuth()

  function roomName (room, members,registeredMember) {
    const r =  room.members.reduce((a, memberid) => (
      memberid === registeredMember.id? a :
        (a + members[memberid].username.split('@')[0] + ", ")
        ),
            '')
            .slice(0, -2)
      return r
  }

  function setRoomNameToAll  (listObject,registeredMember) {
    return {...listObject,
    rooms: listObject.rooms.map(room => {
      room.name = roomName(room,listObject.members,registeredMember)
    })
    }
  } 


  function fetchRoomList() {
    setRoomListLoaded(false)
    axiosInstance.get(all_rooms_url)
      .then(response => {
        let roomlist = response.data
        setRoomNameToAll(roomlist,registeredMember)
          dispatch(
            {type:"FETCH_SUCCESS", payload: roomlist})
      })
      .catch(error => {
          dispatch(
            {type:"FETCH_ERROR"})
      })
  }

  useEffect(() => {
    if (registeredMember && !roomListLoaded) fetchRoomList()
  }, [registeredMember,roomListLoaded]);

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

      case 'UPDATE_LASTPOST' :{
        console.log("inside dispatcher: " ,action.roomid,action.lastPost )
        return {
          ...state,
          rooms: state.rooms.map((room)=>{
            if(room.id===action.roomid){
              room.lastPost = action.lastPost
              room.unread = room.unread+1
              console.log("UPDATE_LASTPOST did update ", room)
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

  const [roomList, dispatch] = useReducer(reducer,null)

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
    console.log("dispatchingggggg last message")
    dispatch(
      {type:"UPDATE_LASTPOST", lastPost: lastPost, roomid: roomid})
    console.log("after dispatch:",roomList)
  }

  function addRoom (room)  {
    dispatch({type:"ADD_ROOM", room: room})}


  return {roomList, setLastPost, setUnread, addRoom, fetchRoomList, roomListLoaded,incrementUnread,resetUnread}
}

export default useRoomList;
