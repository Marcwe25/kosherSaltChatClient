import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { all_rooms_url } from '../utility/constsURL';

function useRoomList() {

  const {axiosInstance} = useApi()

  const [roomList, setRoomList] = useState([]);



  useEffect(() => {
    async function fetchRoomList() {
      const response = await axiosInstance.get(all_rooms_url);

      setRoomList(response.data);
    }
    fetchRoomList();
  }, []);

  const updateRoom = 
    (id, updates) => {
    setRoomList(prevRoomList => {
      const updatedList = prevRoomList.rooms.map(room => {
        if (room.id === id) {
          room.lastMessage=updates
          return room;
        }
        return room;
      })
      prevRoomList.rooms = updatedList
      return prevRoomList
      
  })}

  const addRoom = useCallback((room) => {
    // add new room to room list and update state
    setRoomList(prevRoomList => [...prevRoomList, room]);
  }, []);

  const deleteRoom = useCallback((id) => {
    // remove room from room list and update state
    setRoomList(prevRoomList => prevRoomList.filter(room => room.id !== id));
  }, []);

  return [roomList, setRoomList, updateRoom, addRoom, deleteRoom];
}

export default useRoomList;


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