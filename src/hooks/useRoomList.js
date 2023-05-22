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

  const updateRoom = useCallback((id, updates) => {
    // update room in room list and update state
    setRoomList(prevList => {
      const updatedList = prevList.map(room => {
        if (room.id === id) {
          return { ...room, ...updates };
        }
        return room;
      });
      return updatedList;
    });
  }, []);

  const addRoom = useCallback((room) => {
    // add new room to room list and update state
    setRoomList(prevList => [...prevList, room]);
  }, []);

  const deleteRoom = useCallback((id) => {
    // remove room from room list and update state
    setRoomList(prevList => prevList.filter(room => room.id !== id));
  }, []);

  return [roomList, setRoomList, updateRoom, addRoom, deleteRoom];
}

export default useRoomList;
